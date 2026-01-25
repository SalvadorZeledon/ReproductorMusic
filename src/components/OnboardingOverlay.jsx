import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Music2, Heart, ListOrdered, CloudRain } from "lucide-react";

// Mapeo de nombres de iconos a componentes
const ICON_MAP = {
  Heart,
  Music2,
  ListOrdered,
  CloudRain,
};

// Slides por defecto (fallback si no se pasan props)
const DEFAULT_SLIDES = [
  {
    icon: "Heart",
    title: "Bienvenido/a",
    content: "Gracias por estar aquí.",
  },
];

export default function OnboardingOverlay({ open, onClose, slides }) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  // Usar slides de props o fallback
  const SLIDES = slides && slides.length > 0 ? slides : DEFAULT_SLIDES;

  // Animación de entrada
  useEffect(() => {
    if (open) {
      setIsVisible(true);
      setCurrentSlide(0);
      // Bloquear scroll del body
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Detectar ESC
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
    }, 300);
  };

  const goNext = () => {
    if (currentSlide < SLIDES.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      handleClose();
    }
  };

  const goPrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  // Touch handlers para swipe
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const currentTouch = e.targetTouches[0].clientX;
    setTouchEnd(currentTouch);

    // Calcular offset para el drag visual
    const diff = currentTouch - touchStart;
    // Limitar el drag para que no se vea raro en los extremos
    if ((currentSlide === 0 && diff > 0) || (currentSlide === SLIDES.length - 1 && diff < 0)) {
      setDragOffset(diff * 0.2); // Resistencia en los bordes
    } else {
      setDragOffset(diff);
    }
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      setIsDragging(false);
      setDragOffset(0);
      return;
    }

    const distance = touchStart - touchEnd;
    const threshold = 50; // 50px mínimo para cambiar de slide

    if (Math.abs(distance) > threshold) {
      if (distance > 0) {
        // Swipe left -> siguiente
        goNext();
      } else {
        // Swipe right -> anterior
        goPrev();
      }
    }

    setIsDragging(false);
    setDragOffset(0);
    setTouchStart(null);
    setTouchEnd(null);
  };

  if (!open) return null;

  const slide = SLIDES[currentSlide];
  // Resolver el icono: puede ser string (nombre) o componente directo
  const Icon = typeof slide.icon === "string" ? ICON_MAP[slide.icon] || Heart : slide.icon;

  return (
    <div
      className={`fixed inset-0 z-50 grid place-items-center transition-all duration-300 ${
        isVisible ? "bg-black/60 backdrop-blur-md" : "bg-black/0"
      }`}
      style={{ touchAction: "none" }}
    >
      <div
        className={`relative w-full max-w-lg mx-4 overflow-hidden rounded-3xl ring-1 transition-all duration-300 ease-out ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
        style={{
          backgroundColor: "var(--ui-card-2)",
          borderColor: "var(--ui-border-strong)",
        }}
      >
        {/* Slides container */}
        <div
          className="relative"
          style={{ minHeight: "520px" }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className={`flex h-full ${isDragging ? "" : "transition-transform duration-300 ease-out"}`}
            style={{
              transform: `translateX(calc(-${currentSlide * 100}% + ${dragOffset}px))`,
            }}
          >
            {SLIDES.map((s, idx) => {
              // Resolver icono para cada slide
              const SlideIcon = typeof s.icon === "string" ? ICON_MAP[s.icon] || Heart : s.icon;
              return (
                <div
                  key={idx}
                  className="flex-none w-full h-full flex flex-col items-center justify-center px-8 py-12 text-center"
                >
                  <div
                    className="mb-6 rounded-full p-4 ring-1"
                    style={{
                      backgroundColor: "var(--ui-card)",
                      borderColor: "var(--ui-border)",
                    }}
                  >
                    <SlideIcon
                      className="h-12 w-12"
                      style={{ color: "var(--accent)" }}
                    />
                  </div>

                  <h2
                    className="text-3xl font-bold mb-4"
                    style={{ color: "var(--ui-text)" }}
                  >
                    {s.title}
                  </h2>

                  {s.content && (
                    <p
                      className="text-base leading-relaxed max-w-md whitespace-pre-line"
                      style={{ color: "var(--ui-muted)" }}
                    >
                      {s.content}
                    </p>
                  )}

                  {s.bullets && (
                    <ul className="text-left space-y-3 max-w-md">
                      {s.bullets.map((bullet, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm leading-relaxed"
                          style={{ color: "var(--ui-muted)" }}
                        >
                          <span
                            className="mt-0.5 h-1.5 w-1.5 flex-none rounded-full"
                            style={{ backgroundColor: "var(--accent)" }}
                          />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {s.callout && (
                    <div
                      className="mt-4 max-w-md rounded-xl p-3 ring-1 flex items-center gap-2.5"
                      style={{
                        backgroundColor: "var(--ui-card)",
                        borderColor: "var(--ui-border)",
                      }}
                    >
                      <span className="text-xl flex-none">🎧</span>
                      <p
                        className="text-xs leading-relaxed"
                        style={{ color: "var(--ui-muted)" }}
                      >
                        {s.callout}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Indicadores de página */}
        <div className="flex justify-center gap-2 pb-6">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: idx === currentSlide ? "24px" : "8px",
                backgroundColor:
                  idx === currentSlide ? "var(--accent)" : "var(--ui-border-strong)",
              }}
              aria-label={`Ir a slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Controles de navegación */}
        <div className="flex items-center justify-between gap-3 px-6 pb-6">
          <button
            onClick={goPrev}
            disabled={currentSlide === 0}
            className="rounded-xl px-4 py-2.5 text-sm font-medium ring-1 transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-80 active:scale-95"
            style={{
              backgroundColor: "var(--ui-card)",
              borderColor: "var(--ui-border)",
              color: "var(--ui-text)",
            }}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {currentSlide < SLIDES.length - 1 ? (
            <button
              onClick={goNext}
              className="flex-1 rounded-xl px-6 py-2.5 text-sm font-semibold ring-1 transition-all hover:opacity-90 active:scale-95 text-slate-900"
              style={{
                backgroundColor: "var(--accent)",
                borderColor: "var(--ui-border)",
              }}
            >
              Siguiente
            </button>
          ) : (
            <button
              onClick={handleClose}
              className="flex-1 rounded-xl px-6 py-2.5 text-sm font-semibold ring-1 transition-all hover:opacity-90 active:scale-95 text-slate-900"
              style={{
                backgroundColor: "var(--accent)",
                borderColor: "var(--ui-border)",
              }}
            >
              Entrar ✨
            </button>
          )}

          <button
            onClick={goNext}
            disabled={currentSlide === SLIDES.length - 1}
            className="rounded-xl px-4 py-2.5 text-sm font-medium ring-1 transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-80 active:scale-95"
            style={{
              backgroundColor: "var(--ui-card)",
              borderColor: "var(--ui-border)",
              color: "var(--ui-text)",
            }}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Botón saltar (solo en primer slide) */}
        {currentSlide === 0 && (
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-xs font-medium opacity-60 hover:opacity-100 transition-opacity px-3 py-1.5 rounded-lg"
            style={{ color: "var(--ui-muted)" }}
          >
            Saltar
          </button>
        )}
      </div>
    </div>
  );
}
