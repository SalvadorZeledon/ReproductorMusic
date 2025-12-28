import { useEffect, useMemo, useRef, useState } from "react";
import { TRACKS } from "./tracks";
import Player from "./components/Player";
import Playlist from "./components/Playlist";
import LyricsModal from "./components/LyricsModal";
import BackgroundLayer from "./components/BackgroundLayer";
import OnboardingOverlay from "./components/OnboardingOverlay";
import { Music2, Sparkles } from "lucide-react";

const LS_KEY = "dedicatoria-player:v1";
const ONBOARDING_KEY = "kuskatan_onboarding_v1";

// 🚨 DEBUG: Poner en false antes de deploy
const DEBUG_ONBOARDING = true;

function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

export default function App() {
  const audioRef = useRef(null);

  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [repeatMode, setRepeatMode] = useState("off"); // off | all | one
  const [volume, setVolume] = useState(0.9);
  const [muted, setMuted] = useState(false);

  const [lyricsOpen, setLyricsOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  const track = useMemo(() => TRACKS[index] ?? TRACKS[0], [index]);

  // Verificar si debe mostrar onboarding
  useEffect(() => {
    // Modo DEBUG: siempre muestra el onboarding (ignora localStorage)
    if (DEBUG_ONBOARDING) {
      setShowOnboarding(true);
      return;
    }

    // Modo PRODUCCIÓN: solo muestra si no lo ha visto antes
    const hasSeenOnboarding = localStorage.getItem(ONBOARDING_KEY);
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    }
  }, []);

  // Cargar estado guardado
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      if (typeof saved.index === "number") setIndex(clamp(saved.index, 0, TRACKS.length - 1));
      if (typeof saved.repeatMode === "string") setRepeatMode(saved.repeatMode);
      if (typeof saved.volume === "number") setVolume(clamp(saved.volume, 0, 1));
      if (typeof saved.muted === "boolean") setMuted(saved.muted);
    } catch {
      // ignore
    }
  }, []);

  // Guardar estado
  useEffect(() => {
    const payload = { index, repeatMode, volume, muted };
    localStorage.setItem(LS_KEY, JSON.stringify(payload));
  }, [index, repeatMode, volume, muted]);

  // Sync volumen
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
    audioRef.current.muted = muted;
  }, [volume, muted]);

  // Cambiar track
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.src = track.src;
    audioRef.current.load();
    if (isPlaying) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    }
  }, [track.src]); // eslint-disable-line react-hooks/exhaustive-deps

  const onEnded = () => {
    // REPEAT_ONE: Repite la misma canción
    if (repeatMode === "one") {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => setIsPlaying(false));
      return;
    }

    // REPEAT_ALL: Si es la última canción, vuelve a la primera
    if (repeatMode === "all") {
      const nextIndex = (index + 1) % TRACKS.length;
      setIndex(nextIndex);
      return;
    }

    // OFF: Si no es la última, avanza; si es la última, se detiene
    if (index < TRACKS.length - 1) {
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

  const prev = () => setIndex((i) => (i - 1 + TRACKS.length) % TRACKS.length);
  const next = () => setIndex((i) => (i + 1) % TRACKS.length);

  const cycleRepeat = () => {
    setRepeatMode((r) => (r === "off" ? "all" : r === "all" ? "one" : "off"));
  };

  const handleCloseOnboarding = () => {
    localStorage.setItem(ONBOARDING_KEY, "true");
    setShowOnboarding(false);
  };

  const handleOpenOnboarding = () => {
    setShowOnboarding(true);
  };

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
              <span>7 canciones • letras • dedicatorias</span>
            </div>
            <h1
              className="mt-3 text-2xl font-semibold tracking-tight md:text-4xl"
              style={{ color: "var(--ui-text)" }}
            >
              Un reproductor dedicado solo para ti. <span className="align-middle">🎵💝</span>
            </h1>
            <p
              className="mt-2 max-w-xl text-sm md:text-base"
              style={{ color: "var(--ui-muted)" }}
            >
              Siempre que escucho estas canciones pienso en ti, espero te guste. 💕
            </p>
          </div>

          <div className="flex items-center gap-2">
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
                {TRACKS.length} canciones
              </span>
            </div>

            <Playlist
              tracks={TRACKS}
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
                <span className="text-sm">📖💕</span>
                <span className="font-medium" style={{ color: "var(--ui-text)" }}>Cada canción tiene su historia</span>
              </div>
              <p className="mt-1" style={{ color: "var(--ui-muted)" }}>
                No te saltes las dedicatorias, ahí está lo importante. Escribí lo que sentí al escuchar cada una pensando en ti.
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
        />

        <audio ref={audioRef} preload="metadata" onEnded={onEnded} />
        <footer className="mt-8 text-center text-xs" style={{ color: "var(--ui-muted2)" }}>
          Hecho por Salvador Zeledón en dedicatoria para Gabriela Pimentel 💕
        </footer>
      </div>
    </div>
  );
}
