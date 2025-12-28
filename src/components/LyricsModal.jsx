import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function LyricsModal({ open, onClose, track }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setIsVisible(true);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") handleClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 200);
  };

  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 z-50 grid place-items-center p-4 transition-all duration-300 ${
        isVisible ? "bg-black/60 backdrop-blur-md" : "bg-black/0"
      }`}
      onMouseDown={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label="Dedicatoria"
    >
      <div
        className={`w-full max-w-lg overflow-hidden rounded-3xl ring-1 transition-all duration-300 ease-out ${
          isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"
        }`}
        style={{
          backgroundColor: "var(--ui-card-2)",
          borderColor: "var(--ui-border-strong)",
        }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div
          className={`flex items-center justify-between gap-3 px-4 py-3 ring-1 ring-inset transition-all duration-300 delay-75 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          }`}
          style={{
            borderColor: "var(--ui-border)",
          }}
        >
          <div className="flex items-center gap-3 min-w-0">
            {track.cover && (
              <div
                className="relative h-12 w-12 flex-none overflow-hidden rounded-lg ring-1"
                style={{
                  backgroundColor: "var(--ui-card)",
                  borderColor: "var(--ui-border)",
                }}
              >
                <img
                  src={track.cover}
                  alt={`Portada de ${track.title}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              </div>
            )}
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold" style={{ color: "var(--ui-text)" }}>
                {track.title}
              </div>
              <div className="truncate text-xs" style={{ color: "var(--ui-muted)" }}>
                {track.artist}
              </div>
              {track.album && (
                <div className="truncate text-xs" style={{ color: "var(--ui-muted2)" }}>
                  {track.album}
                </div>
              )}
            </div>
          </div>
          <button
            onClick={handleClose}
            className="rounded-xl p-2 ring-1 hover:opacity-80 transition-all active:scale-95"
            style={{
              backgroundColor: "var(--ui-card)",
              borderColor: "var(--ui-border)",
              color: "var(--ui-text)",
            }}
            aria-label="Cerrar"
            title="Cerrar (Esc)"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div
          className={`max-h-[70vh] overflow-y-auto p-6 transition-all duration-300 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          <div
            className="rounded-2xl p-5 ring-1"
            style={{
              backgroundColor: "var(--ui-card)",
              borderColor: "var(--ui-border)",
            }}
          >
            <p className="text-xs font-medium mb-3" style={{ color: "var(--ui-muted)" }}>
              Dedicatoria 💕
            </p>
            <p
              className="text-base leading-relaxed whitespace-pre-wrap"
              style={{ color: "var(--ui-text)" }}
            >
              {track.dedication || "No hay dedicatoria para esta canción."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
