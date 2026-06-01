import { useState, useEffect } from "react";
import { X } from "lucide-react";

// Keys de localStorage para el modo YES
const WELCOME_KEY = "dedicatoria-player:yes:welcome_seen:v1";
const COMPLETED_KEY = "dedicatoria-player:yes:completed:v1";
const PLAYED_TRACKS_KEY = "dedicatoria-player:yes:playedTrackIds:v1";

// Poema de bienvenida
const WELCOME_POEM = `Días como hoy, me recuerdan porque te quiero
Días como hoy se vuelven eternos si me das la mano
Días como hoy vivo del recuerdo de cada abrazo, de esos abrazos
tan fríos que parecen congelar el tiempo
Días como hoy me pican las ciatrices de aquel unico beso que me diste

Días como hoy no puedo evitar extrañarte, extraño la fantasia de pensar en poder construir sonrisas en tu rostro todos los días de mi vida pero... quién sabe,
porque cada vez que me miras yo te miro
porque cada vez que que me extrañas yo te extraño
porque cada vez que me quieres yo te quiero y
porque cada vez que tu dudas yo dudo...`;

// Mensaje de finalización
const COMPLETED_MESSAGE = `Si lees esto es porque terminas de escuchar todas las canciones, gracias por tomarte el tiempo. Pero esto no termina aquí yo te dije que eran 3 detalles y este es el segundo, si quieres saber cual hace falta te recuerdo que tienes a un chico que seguramente esta pensando en ti en este momento, creo que sería justo que lo llames. 

tu no lo sabes pero el esta esperando tu llamada en este momento`;

// Funciones de utilidad para localStorage
export const hasSeenWelcome = () => {
  try {
    return localStorage.getItem(WELCOME_KEY) === "true";
  } catch {
    return false;
  }
};

export const markWelcomeSeen = () => {
  try {
    localStorage.setItem(WELCOME_KEY, "true");
  } catch {
    // ignore
  }
};

export const hasCompletedPlaylist = () => {
  try {
    return localStorage.getItem(COMPLETED_KEY) === "true";
  } catch {
    return false;
  }
};

export const markPlaylistCompleted = () => {
  try {
    localStorage.setItem(COMPLETED_KEY, "true");
  } catch {
    // ignore
  }
};

export const getPlayedTrackIds = () => {
  try {
    const raw = localStorage.getItem(PLAYED_TRACKS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

export const addPlayedTrackId = (trackId) => {
  try {
    const current = getPlayedTrackIds();
    if (!current.includes(trackId)) {
      current.push(trackId);
      localStorage.setItem(PLAYED_TRACKS_KEY, JSON.stringify(current));
    }
    return current;
  } catch {
    return [];
  }
};

export const clearYesModeProgress = () => {
  try {
    localStorage.removeItem(WELCOME_KEY);
    localStorage.removeItem(COMPLETED_KEY);
    localStorage.removeItem(PLAYED_TRACKS_KEY);
  } catch {
    // ignore
  }
};

// Modal base con glassmorphism
function GlassModal({ open, onClose, children, showClose = false }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-3xl p-6 sm:p-8 ring-1 animate-in fade-in zoom-in-95 duration-300"
        style={{
          backgroundColor: "rgba(15, 23, 42, 0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderColor: "rgba(255, 255, 255, 0.15)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)",
        }}
      >
        {showClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
            style={{ color: "rgba(255, 255, 255, 0.6)" }}
          >
            <X className="w-5 h-5" />
          </button>
        )}
        {children}
      </div>
    </div>
  );
}

// Modal de Bienvenida (modo YES)
export function WelcomeModal({ open, onClose }) {
  return (
    <GlassModal open={open} onClose={onClose}>
      <div className="text-center">
        {/* Título */}
        <h2
          className="text-2xl sm:text-3xl font-semibold mb-6"
          style={{ color: "rgba(255, 255, 255, 0.95)" }}
        >
          Días como hoy… 💛
        </h2>

        {/* Poema */}
        <div
          className="text-left text-sm sm:text-base leading-relaxed whitespace-pre-line mb-8 px-2"
          style={{ color: "rgba(255, 255, 255, 0.8)" }}
        >
          {WELCOME_POEM}
        </div>

        {/* Subtexto */}
        <p
          className="text-xs mb-4"
          style={{ color: "rgba(255, 255, 255, 0.5)" }}
        >
          (Toca continuar cuando estés lista)
        </p>

        {/* Botón */}
        <button
          onClick={onClose}
          className="w-full sm:w-auto px-8 py-3 rounded-2xl font-medium text-base transition-all hover:scale-[1.02] active:scale-[0.98]"
          style={{
            background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
            color: "#1f2937",
            boxShadow: "0 4px 14px 0 rgba(251, 191, 36, 0.4)",
          }}
        >
          Continuar ✨
        </button>
      </div>
    </GlassModal>
  );
}

// Modal de Finalización (modo YES)
export function CompletedModal({ open, onClose, onReset }) {
  return (
    <GlassModal open={open} onClose={onClose} showClose>
      <div className="text-center">
        {/* Icono/Emoji */}
        <div className="text-5xl mb-4">🎉</div>

        {/* Título */}
        <h2
          className="text-xl sm:text-2xl font-semibold mb-6"
          style={{ color: "rgba(255, 255, 255, 0.95)" }}
        >
          ¡Completaste la playlist! 💛
        </h2>

        {/* Mensaje */}
        <div
          className="text-left text-sm sm:text-base leading-relaxed whitespace-pre-line mb-8 px-2"
          style={{ color: "rgba(255, 255, 255, 0.8)" }}
        >
          {COMPLETED_MESSAGE}
        </div>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onClose}
            className="px-8 py-3 rounded-2xl font-medium text-base transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
              color: "#1f2937",
              boxShadow: "0 4px 14px 0 rgba(251, 191, 36, 0.4)",
            }}
          >
            Entiendo 💛
          </button>

          {onReset && (
            <button
              onClick={onReset}
              className="px-6 py-3 rounded-2xl font-medium text-sm transition-all hover:bg-white/10 active:scale-[0.98]"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                color: "rgba(255, 255, 255, 0.7)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
              }}
            >
              Volver al inicio
            </button>
          )}
        </div>
      </div>
    </GlassModal>
  );
}

// Hook para manejar el estado de los modales del modo YES
export function useYesModeModals(mode, tracks, onReset) {
  const [showWelcome, setShowWelcome] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);
  const [playedTracks, setPlayedTracks] = useState(new Set());

  // Cargar estado inicial cuando el modo es YES
  useEffect(() => {
    if (mode !== "yes") {
      setShowWelcome(false);
      setShowCompleted(false);
      setPlayedTracks(new Set());
      return;
    }

    // Verificar si debe mostrar modal de bienvenida
    if (!hasSeenWelcome()) {
      setShowWelcome(true);
    }

    // Cargar tracks reproducidos
    const savedTracks = getPlayedTrackIds();
    setPlayedTracks(new Set(savedTracks));
  }, [mode]);

  // Marcar canción como escuchada
  const markTrackPlayed = (trackId) => {
    if (mode !== "yes") return;

    const updatedIds = addPlayedTrackId(trackId);
    const newSet = new Set(updatedIds);
    setPlayedTracks(newSet);

    // Verificar si completó todas las canciones
    if (newSet.size >= tracks.length && !hasCompletedPlaylist()) {
      markPlaylistCompleted();
      setShowCompleted(true);
    }
  };

  // Cerrar modal de bienvenida
  const closeWelcome = () => {
    markWelcomeSeen();
    setShowWelcome(false);
  };

  // Cerrar modal de completado
  const closeCompleted = () => {
    setShowCompleted(false);
  };

  // Reset y volver al wizard
  const handleReset = () => {
    setShowCompleted(false);
    if (onReset) onReset();
  };

  return {
    showWelcome,
    showCompleted,
    playedTracks,
    markTrackPlayed,
    closeWelcome,
    closeCompleted,
    handleReset,
    progress: {
      played: playedTracks.size,
      total: tracks.length,
      percentage: tracks.length > 0 ? Math.round((playedTracks.size / tracks.length) * 100) : 0,
    },
  };
}
