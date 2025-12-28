import { useEffect, useMemo, useState } from "react";
import {
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Repeat,
  Repeat1,
  Volume2,
  VolumeX,
  FileText,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function Player({
  audioRef,
  track,
  isPlaying,
  onPlayPause,
  onPrev,
  onNext,
  repeatMode,
  onCycleRepeat,
  volume,
  onVolume,
  muted,
  onToggleMute,
  onOpenLyrics,
}) {
  const [cur, setCur] = useState(0);
  const [dur, setDur] = useState(0);
  const [lyricsExpanded, setLyricsExpanded] = useState(false);

  const repeatIcon = useMemo(() => {
    if (repeatMode === "one") return <Repeat1 className="h-5 w-5" />;
    return <Repeat className="h-5 w-5" />;
  }, [repeatMode]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;

    const onTime = () => setCur(a.currentTime || 0);
    const onMeta = () => setDur(a.duration || 0);

    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("durationchange", onMeta);

    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onMeta);
      a.removeEventListener("durationchange", onMeta);
    };
  }, [audioRef, track.src]);

  const seek = (e) => {
    const a = audioRef.current;
    if (!a || !dur) return;
    const v = Number(e.target.value);
    a.currentTime = (v / 100) * dur;
  };

  const coverOk = Boolean(track.cover);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4" key={track.id}>
        <div
          className="relative h-24 w-24 flex-none overflow-hidden rounded-2xl ring-1 md:h-28 md:w-28 transition-all duration-500 animate-[fadeIn_0.5s_ease-out]"
          style={{
            backgroundColor: "var(--ui-card-2)",
            borderColor: "var(--ui-border)",
          }}
        >
          {coverOk ? (
            <img
              src={track.cover}
              alt={`Portada de ${track.title}`}
              className="h-full w-full object-cover"
              loading="lazy"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/30 to-transparent" />
        </div>

        <div className="min-w-0 flex-1 transition-all duration-500 animate-[slideIn_0.5s_ease-out]">
          <h3 className="truncate text-lg font-semibold md:text-2xl" style={{ color: "var(--ui-text)" }}>
            {track.title}
          </h3>
          <p className="truncate text-sm md:text-base" style={{ color: "var(--ui-muted)" }}>
            {track.artist}
          </p>
          {track.album && (
            <p className="truncate text-xs md:text-sm" style={{ color: "var(--ui-muted2)" }}>
              {track.album}
            </p>
          )}

          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={onOpenLyrics}
              className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs ring-1 hover:opacity-80 transition-all active:scale-95"
              style={{
                backgroundColor: "var(--ui-card-2)",
                borderColor: "var(--ui-border)",
                color: "var(--ui-text)",
              }}
              title="Ver dedicatoria"
            >
              <FileText className="h-4 w-4" />
              Dedicatoria
            </button>

            <span className="ml-auto text-xs" style={{ color: "var(--ui-muted)" }}>
              {formatTime(cur)} / {formatTime(dur)}
            </span>
          </div>
        </div>
      </div>

      {/* Barra de progreso */}
      <div
        className="rounded-2xl p-3 ring-1 relative overflow-hidden transition-all"
        style={{
          backgroundColor: "var(--ui-card-2)",
          borderColor: "var(--ui-border)",
        }}
      >
        <div
          className="absolute inset-0 opacity-20 transition-opacity duration-500"
          style={{
            background: `linear-gradient(90deg, var(--accent), var(--accent2))`,
            width: `${dur ? (cur / dur) * 100 : 0}%`,
          }}
        />
        <input
          type="range"
          min="0"
          max="100"
          value={dur ? Math.round((cur / dur) * 100) : 0}
          onChange={seek}
          className="w-full relative z-10 transition-all"
          style={{
            accentColor: `var(--accent)`,
          }}
          aria-label="Progreso"
        />
      </div>

      {/* Controles */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={onCycleRepeat}
              className="rounded-xl px-3 py-2 ring-1 transition-all active:scale-95"
              style={
                repeatMode === "off"
                  ? {
                      backgroundColor: "var(--ui-card)",
                      borderColor: "var(--ui-border)",
                      color: "var(--ui-text)",
                    }
                  : {
                      backgroundColor: "var(--ui-text)",
                      borderColor: "var(--ui-border-strong)",
                      color: "var(--ui-bg)",
                    }
              }
              title={
                repeatMode === "off"
                  ? "Repetir: apagado"
                  : repeatMode === "all"
                  ? "Repetir: toda la lista"
                  : "Repetir: esta canción"
              }
            >
              {repeatIcon}
            </button>
            {repeatMode === "one" && (
              <span
                className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold"
                style={{
                  backgroundColor: "var(--ui-text)",
                  color: "var(--ui-bg)",
                }}
              >
                1
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onPrev}
            className="rounded-xl px-3 py-2 ring-1 hover:opacity-80 transition-all active:scale-95"
            style={{
              backgroundColor: "var(--ui-card)",
              borderColor: "var(--ui-border)",
              color: "var(--ui-text)",
            }}
            title="Anterior"
          >
            <SkipBack className="h-5 w-5" />
          </button>

          <button
            onClick={onPlayPause}
            className="rounded-2xl px-5 py-3 ring-1 transition-all active:scale-95 relative overflow-hidden"
            style={{
              background: isPlaying
                ? `linear-gradient(135deg, var(--accent), var(--accent2))`
                : "var(--ui-card-2)",
              borderColor: isPlaying ? "transparent" : "var(--ui-border)",
              color: isPlaying ? "#000" : "var(--ui-text)",
              boxShadow: isPlaying ? `0 0 20px color-mix(in oklab, var(--accent) 30%, transparent)` : "none",
            }}
            title={isPlaying ? "Pausar" : "Reproducir"}
          >
            {isPlaying ? <Pause className="h-6 w-6 relative z-10" /> : <Play className="h-6 w-6 relative z-10" />}
          </button>

          <button
            onClick={onNext}
            className="rounded-xl px-3 py-2 ring-1 hover:opacity-80 transition-all active:scale-95"
            style={{
              backgroundColor: "var(--ui-card)",
              borderColor: "var(--ui-border)",
              color: "var(--ui-text)",
            }}
            title="Siguiente"
          >
            <SkipForward className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleMute}
            className="rounded-xl px-3 py-2 ring-1 hover:opacity-80 transition-all active:scale-95"
            style={{
              backgroundColor: "var(--ui-card)",
              borderColor: "var(--ui-border)",
              color: "var(--ui-text)",
            }}
            title={muted ? "Activar sonido" : "Silenciar"}
          >
            {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => onVolume(Number(e.target.value))}
            className="w-36 transition-all"
            style={{
              accentColor: `var(--accent)`,
            }}
            aria-label="Volumen"
          />
        </div>
      </div>

      {/* Letra con expand/collapse */}
      <div
        className="rounded-2xl p-4 text-sm ring-1 transition-all duration-500 relative"
        style={{
          backgroundColor: "var(--ui-card-2)",
          borderColor: "var(--ui-border)",
          color: "var(--ui-text)",
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <p className="font-medium" style={{ color: "var(--ui-text)" }}>Letra:</p>
          <button
            onClick={() => setLyricsExpanded(!lyricsExpanded)}
            className="inline-flex items-center gap-1 text-xs rounded-lg px-2 py-1 hover:opacity-80 transition-all"
            style={{ color: "var(--ui-muted)" }}
          >
            {lyricsExpanded ? (
              <>
                Ver menos <ChevronUp className="h-3 w-3" />
              </>
            ) : (
              <>
                Leer más <ChevronDown className="h-3 w-3" />
              </>
            )}
          </button>
        </div>
        <div className="relative">
          <div
            className={`whitespace-pre-wrap font-sans leading-relaxed transition-all duration-300 ${
              lyricsExpanded ? "max-h-[400px] overflow-y-auto" : "max-h-[80px] overflow-hidden"
            }`}
          >
            {track.lyrics ? (
              track.lyrics.split('\n').map((line, i) => {
                // Detectar si la línea está en inglés (empieza con palabras comunes en inglés o contiene patrones típicos)
                const isEnglish = /^(And|'Cause|When|You|I|Yeah|Or|The|Just|Because|'cause)\b/i.test(line.trim()) ||
                                  /\b(you|the|and|that|with|for|are|have|this|from|they|know|will|what|been|when)\b/i.test(line.toLowerCase());

                return (
                  <div
                    key={i}
                    className={isEnglish ? "italic opacity-60" : ""}
                    style={{ color: "var(--ui-muted)" }}
                  >
                    {line || '\u00A0'}
                  </div>
                );
              })
            ) : (
              <div style={{ color: "var(--ui-muted)" }}>
                No hay letra disponible para esta canción.
              </div>
            )}
          </div>
          {!lyricsExpanded && track.lyrics && (
            <div
              className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none"
              style={{
                background: `linear-gradient(to bottom, transparent, var(--ui-card-2))`,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
