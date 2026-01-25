import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import {
  getModeData,
  getSavedMode,
  saveMode,
  clearMode,
  getPlayerLSKey,
  getOnboardingLSKey,
} from "./modes";
import Player from "./components/Player";
import Playlist from "./components/Playlist";
import LyricsModal from "./components/LyricsModal";
import BackgroundLayer from "./components/BackgroundLayer";
import OnboardingOverlay from "./components/OnboardingOverlay";
import DecisionWizard from "./components/DecisionWizard";
import {
  WelcomeModal,
  CompletedModal,
  useYesModeModals,
  clearYesModeProgress,
} from "./components/YesModeModals";
import { Music2, Sparkles, RotateCcw } from "lucide-react";

// 🚨 DEBUG: Poner en false antes de deploy
const DEBUG_ONBOARDING = false;
const DEBUG_WIZARD = false; // Forzar mostrar wizard aunque haya modo guardado

function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

export default function App() {
  const audioRef = useRef(null);

  // Estado del modo (yes/no/null)
  const [mode, setMode] = useState(() => {
    if (DEBUG_WIZARD) return null;
    return getSavedMode();
  });

  // Obtener datos del modo actual
  const modeData = useMemo(() => getModeData(mode), [mode]);
  const tracks = modeData?.tracks ?? [];
  const config = modeData?.config ?? null;

  // Estados del reproductor
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [repeatMode, setRepeatMode] = useState("off"); // off | all | one
  const [volume, setVolume] = useState(0.9);
  const [muted, setMuted] = useState(false);

  const [lyricsOpen, setLyricsOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  const track = useMemo(() => tracks[index] ?? tracks[0] ?? null, [tracks, index]);

  // Cargar estado guardado POR MODO
  useEffect(() => {
    if (!mode) return;

    const lsKey = getPlayerLSKey(mode);
    try {
      const raw = localStorage.getItem(lsKey);
      if (!raw) return;
      const saved = JSON.parse(raw);
      if (typeof saved.index === "number") setIndex(clamp(saved.index, 0, tracks.length - 1));
      if (typeof saved.repeatMode === "string") setRepeatMode(saved.repeatMode);
      if (typeof saved.volume === "number") setVolume(clamp(saved.volume, 0, 1));
      if (typeof saved.muted === "boolean") setMuted(saved.muted);
    } catch {
      // ignore
    }
  }, [mode, tracks.length]);

  // Guardar estado POR MODO
  useEffect(() => {
    if (!mode) return;

    const lsKey = getPlayerLSKey(mode);
    const payload = { index, repeatMode, volume, muted };
    localStorage.setItem(lsKey, JSON.stringify(payload));
  }, [mode, index, repeatMode, volume, muted]);

  // Verificar si debe mostrar onboarding POR MODO
  useEffect(() => {
    if (!mode) return;

    // Modo DEBUG: siempre muestra el onboarding
    if (DEBUG_ONBOARDING) {
      setShowOnboarding(true);
      return;
    }

    // Modo PRODUCCIÓN: solo muestra si no lo ha visto para este modo
    const onboardingKey = getOnboardingLSKey(mode);
    const hasSeenOnboarding = localStorage.getItem(onboardingKey);
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    }
  }, [mode]);

  // Sync volumen
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
    audioRef.current.muted = muted;
  }, [volume, muted]);

  // Cambiar track
  useEffect(() => {
    if (!audioRef.current || !track) return;
    audioRef.current.src = track.src;
    audioRef.current.load();
    if (isPlaying) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    }
  }, [track?.src]); // eslint-disable-line react-hooks/exhaustive-deps

  const onEnded = () => {
    if (tracks.length === 0) return;

    // Marcar track actual como escuchado (para modo YES)
    if (track?.id) {
      yesModeModals.markTrackPlayed(track.id);
    }

    // REPEAT_ONE: Repite la misma canción
    if (repeatMode === "one") {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => setIsPlaying(false));
      return;
    }

    // REPEAT_ALL: Si es la última canción, vuelve a la primera
    if (repeatMode === "all") {
      const nextIndex = (index + 1) % tracks.length;
      setIndex(nextIndex);
      return;
    }

    // OFF: Si no es la última, avanza; si es la última, se detiene
    if (index < tracks.length - 1) {
      setIndex(index + 1);
    } else {
      setIsPlaying(false);
    }
  };

  const playPause = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (isPlaying) {
      a.pause();
      setIsPlaying(false);
      return;
    }
    try {
      await a.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const prev = () => {
    if (tracks.length === 0) return;
    setIndex((i) => (i - 1 + tracks.length) % tracks.length);
  };

  const next = () => {
    if (tracks.length === 0) return;
    setIndex((i) => (i + 1) % tracks.length);
  };

  const cycleRepeat = () => {
    setRepeatMode((r) => (r === "off" ? "all" : r === "all" ? "one" : "off"));
  };

  const handleCloseOnboarding = () => {
    if (!mode) return;
    const onboardingKey = getOnboardingLSKey(mode);
    localStorage.setItem(onboardingKey, "true");
    setShowOnboarding(false);
  };

  const handleOpenOnboarding = () => {
    setShowOnboarding(true);
  };

  // Manejar decisión del wizard
  const handleWizardComplete = useCallback((choice) => {
    // Pausar audio si estaba sonando
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
    setIndex(0);

    // Guardar modo
    saveMode(choice);
    setMode(choice);
  }, []);

  // Volver al wizard (botón debug/cambiar decisión)
  const handleResetMode = useCallback(() => {
    // Pausar audio
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
    setIndex(0);

    // Limpiar progreso del modo YES si estamos en él
    clearYesModeProgress();

    // Limpiar modo
    clearMode();
    setMode(null);
  }, []);

  // Hook para modales específicos del modo YES
  const yesModeModals = useYesModeModals(mode, tracks, handleResetMode);

  // Si no hay modo, mostrar el wizard
  if (!mode || !modeData || !track) {
    return (
      <div
        className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"
        style={{
          "--accent": "#a78bfa",
          "--accent2": "#ec4899",
          "--ui-bg": "rgba(10,14,25,0.55)",
          "--ui-card": "rgba(255,255,255,0.06)",
          "--ui-card-2": "rgba(255,255,255,0.08)",
          "--ui-border": "rgba(255,255,255,0.12)",
          "--ui-border-strong": "rgba(255,255,255,0.18)",
          "--ui-text": "rgba(255,255,255,0.92)",
          "--ui-muted": "rgba(255,255,255,0.65)",
          "--ui-muted2": "rgba(255,255,255,0.45)",
        }}
      >
        <DecisionWizard onComplete={handleWizardComplete} />
      </div>
    );
  }

  // Estilos dinámicos basados en el track actual
  const [c0, c1, c2, c3] = track.theme?.colors || ["#ffffff", "#94a3b8", "#ffffff", "#94a3b8"];
  const isLightMode = track.theme?.mode === "light";

  const uiTokens = isLightMode
    ? {
        "--ui-bg": "rgba(255,255,255,0.55)",
        "--ui-card": "rgba(255,255,255,0.72)",
        "--ui-card-2": "rgba(255,255,255,0.85)",
        "--ui-border": "rgba(15,23,42,0.12)",
        "--ui-border-strong": "rgba(15,23,42,0.20)",
        "--ui-text": "rgba(15,23,42,0.92)",
        "--ui-muted": "rgba(15,23,42,0.62)",
        "--ui-muted2": "rgba(15,23,42,0.42)",
      }
    : {
        "--ui-bg": "rgba(10,14,25,0.55)",
        "--ui-card": "rgba(255,255,255,0.06)",
        "--ui-card-2": "rgba(255,255,255,0.08)",
        "--ui-border": "rgba(255,255,255,0.12)",
        "--ui-border-strong": "rgba(255,255,255,0.18)",
        "--ui-text": "rgba(255,255,255,0.92)",
        "--ui-muted": "rgba(255,255,255,0.65)",
        "--ui-muted2": "rgba(255,255,255,0.45)",
      };

  return (
    <div
      className={`min-h-screen transition-all duration-700 ${isLightMode ? "theme-light" : "theme-dark"}`}
      style={{
        "--accent": c2,
        "--accent2": c3,
        ...uiTokens,
      }}
    >
      {/* Fondo dinámico con crossfade */}
      <BackgroundLayer theme={track.theme} />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-6 md:py-10">
        <header className="mb-6 flex items-start justify-between gap-4">
          <div>
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs ring-1 transition-all"
              style={{
                backgroundColor: "var(--ui-card)",
                borderColor: "var(--ui-border)",
                color: "var(--ui-muted)",
              }}
            >
              <Music2 className="h-4 w-4" />
              <span>{config.ui.badgeText}</span>
            </div>
            <h1
              className="mt-3 text-2xl font-semibold tracking-tight md:text-4xl"
              style={{ color: "var(--ui-text)" }}
            >
              {config.ui.title} <span className="align-middle">{config.ui.titleEmoji}</span>
            </h1>
            <p
              className="mt-2 max-w-xl text-sm md:text-base"
              style={{ color: "var(--ui-muted)" }}
            >
              {config.ui.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Botón discreto para cambiar decisión (debug) */}
            <button
              onClick={handleResetMode}
              className="rounded-xl px-3 py-2 text-xs ring-1 hover:opacity-80 transition-all opacity-40 hover:opacity-70"
              style={{
                backgroundColor: "var(--ui-card)",
                borderColor: "var(--ui-border)",
                color: "var(--ui-muted)",
              }}
              title="Cambiar decisión"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
            <button
              onClick={handleOpenOnboarding}
              className="rounded-xl px-3 py-2 text-xs ring-1 hover:opacity-80 transition-all"
              style={{
                backgroundColor: "var(--ui-card)",
                borderColor: "var(--ui-border)",
                color: "var(--ui-muted)",
              }}
              title="Ver bienvenida"
            >
              <Sparkles className="h-4 w-4" />
            </button>
            <button
              onClick={() => setLyricsOpen(true)}
              className="hidden md:flex rounded-xl px-4 py-2 text-sm ring-1 hover:opacity-80 transition-all"
              style={{
                backgroundColor: "var(--ui-card)",
                borderColor: "var(--ui-border)",
                color: "var(--ui-text)",
              }}
              title="Ver dedicatoria"
            >
              Dedicatoria
            </button>
          </div>
        </header>

        <div className="grid gap-4 md:grid-cols-[1.2fr_.8fr]">
          <div
            className="rounded-3xl p-4 ring-1 md:p-6 transition-all"
            style={{
              backgroundColor: "var(--ui-card)",
              borderColor: "var(--ui-border)",
            }}
          >
            <Player
              audioRef={audioRef}
              track={track}
              isPlaying={isPlaying}
              onPlayPause={playPause}
              onPrev={prev}
              onNext={next}
              repeatMode={repeatMode}
              onCycleRepeat={cycleRepeat}
              volume={volume}
              onVolume={setVolume}
              muted={muted}
              onToggleMute={() => setMuted((m) => !m)}
              onOpenLyrics={() => setLyricsOpen(true)}
            />
          </div>

          <div
            className="rounded-3xl p-4 ring-1 md:p-6 transition-all"
            style={{
              backgroundColor: "var(--ui-card)",
              borderColor: "var(--ui-border)",
            }}
          >
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-base font-medium" style={{ color: "var(--ui-text)" }}>
                Lista
              </h2>
              <span className="text-xs" style={{ color: "var(--ui-muted)" }}>
                {tracks.length} canciones
              </span>
            </div>

            <Playlist
              tracks={tracks}
              currentIndex={index}
              onPick={(i) => setIndex(i)}
            />

            <div
              className="mt-4 rounded-2xl p-3 text-xs ring-1 transition-all"
              style={{
                backgroundColor: "var(--ui-card-2)",
                borderColor: "var(--ui-border)",
                color: "var(--ui-muted)",
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm">{config.ui.playlistHintEmoji}</span>
                <span className="font-medium" style={{ color: "var(--ui-text)" }}>Cada canción tiene su historia</span>
              </div>
              <p className="mt-1" style={{ color: "var(--ui-muted)" }}>
                {config.ui.playlistHint}
              </p>
            </div>
          </div>
        </div>

        <LyricsModal
          open={lyricsOpen}
          onClose={() => setLyricsOpen(false)}
          track={track}
        />

        <OnboardingOverlay
          open={showOnboarding}
          onClose={handleCloseOnboarding}
          slides={config.onboarding}
        />

        <audio ref={audioRef} preload="metadata" onEnded={onEnded} />
        <footer className="mt-8 text-center text-xs" style={{ color: "var(--ui-muted2)" }}>
          {config.ui.footerText}
        </footer>
      </div>

      {/* Modales específicos del modo YES */}
      {mode === "yes" && (
        <>
          <WelcomeModal
            open={yesModeModals.showWelcome}
            onClose={yesModeModals.closeWelcome}
          />
          <CompletedModal
            open={yesModeModals.showCompleted}
            onClose={yesModeModals.closeCompleted}
            onReset={yesModeModals.handleReset}
          />
        </>
      )}
    </div>
  );
}
