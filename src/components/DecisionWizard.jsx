import { useEffect, useState, useRef, useCallback } from "react";
import {
  ChevronLeft,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  Info,
  MessageCircle,
  Heart,
  RotateCcw,
  X,
} from "lucide-react";
import { validateNumber } from "../private";

// ========================================
// CONFIGURACIÓN DEL WIZARD
// ========================================

// Vista 0: Bienvenida
const WELCOME_CONTENT = {
  title: "Bienvenida ✨",
  lines: [
    "Este reproductor fue hecho especialmente para ti. 🎶💌",
    "Dentro encontrarás canciones con sus letras y dedicatorias.",
    "Cada canción tiene su propia historia y fue elegida con cuidado. 🎵",
  ],
  buttonText: "Entrar ✨",
};

// Paso 1: Preguntas del "Nivel Fácil"
const QUIZ_QUESTIONS = [
  {
    id: "height",
    type: "multiple",
    text: "¿Cuánta diferencia de estatura existe entre la chica que me gusta y yo?",
    infoText:
      "La diferencia se refiere a lo siguiente: [Altura de la chica que me gusta] − [Mi altura]\n\nEsto siempre será un número positivo, porque no existen distancias negativas.",
    options: [
      { value: "3cm", label: "3cm" },
      { value: "4cm", label: "4cm" },
      { value: "7cm", label: "7cm" },
      { value: "10cm", label: "10cm" },
    ],
    correctAnswer: "4cm",
    errorMessage: "Tienes otra oportunidad 🙂",
  },
  {
    id: "phone",
    type: "phone",
    text: "La chica que me gusta actualmente tiene dos números telefónicos, escribe uno de los dos:",
    errorMessage: "Ah no conoces tu propio número? 😅",
  },
  {
    id: "nickname",
    type: "text",
    text: "¿Cuál es el apodo de la chica que me gusta?",
    hint: "EL APODO QUE TE DICE TU ABUELA 👵",
    correctAnswer: "gaviota",
    errorMessage: "Tienes otra oportunidad 🐦",
  },
];

// Paso 2: Contexto + checkbox
const CONTEXT_CONTENT = {
  text: "(Aquí irá el contexto…)",
  checkboxLabel: "He leído todo y estoy al día con el contexto",
  buttonText: "Pregunta Importante 💬",
};

// Paso 3: Decisión final
const DECISION_CONTENT = {
  title: "¿Qué es lo que quieres? 💭",
  lines: [
    "¿Te gustaría que retomemos esa relación donde intentamos ser algo más que amigos? 🤝➡️❤️",
    "¿Me permites seguirte conquistando? 😊",
    "(prometo echarle ganas 💪✨)",
  ],
  yesButton: "SÍ ✅",
  noButton: "NO 🖤",
};

// ========================================
// COMPONENTES AUXILIARES
// ========================================

// Input de teléfono con formato automático
function PhoneInput({ value, onChange, onSubmit, disabled }) {
  const inputRef = useRef(null);

  const formatPhone = (raw) => {
    const digits = raw.replace(/\D/g, "").slice(0, 8);
    if (digits.length > 4) {
      return `${digits.slice(0, 4)}-${digits.slice(4)}`;
    }
    return digits;
  };

  const handleChange = (e) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 8);
    onChange(raw);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && value.length === 8) {
      onSubmit();
    }
  };

  return (
    <div className="w-full">
      <input
        ref={inputRef}
        type="tel"
        inputMode="numeric"
        pattern="[0-9]*"
        value={formatPhone(value)}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder="0000-0000"
        className="w-full px-4 py-3.5 rounded-xl text-center text-lg font-mono tracking-widest ring-1 transition-all focus:outline-none focus:ring-2"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.08)",
          borderColor: "rgba(255, 255, 255, 0.15)",
          color: "rgba(255, 255, 255, 0.95)",
        }}
        autoComplete="off"
      />
      <button
        onClick={onSubmit}
        disabled={value.length !== 8 || disabled}
        className="w-full mt-3 px-6 py-3.5 rounded-xl text-sm font-semibold ring-1 transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]"
        style={{
          backgroundColor: value.length === 8 ? "#a78bfa" : "rgba(255, 255, 255, 0.1)",
          borderColor: "rgba(255, 255, 255, 0.1)",
          color: value.length === 8 ? "#0f0f1a" : "rgba(255, 255, 255, 0.5)",
        }}
      >
        Verificar
      </button>
    </div>
  );
}

// Input de texto para el apodo
function TextInput({ value, onChange, onSubmit, disabled, placeholder = "Escribe aquí..." }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && value.trim()) {
      onSubmit();
    }
  };

  return (
    <div className="w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder={placeholder}
        className="w-full px-4 py-3.5 rounded-xl text-center text-lg ring-1 transition-all focus:outline-none focus:ring-2"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.08)",
          borderColor: "rgba(255, 255, 255, 0.15)",
          color: "rgba(255, 255, 255, 0.95)",
        }}
        autoComplete="off"
      />
      <button
        onClick={onSubmit}
        disabled={!value.trim() || disabled}
        className="w-full mt-3 px-6 py-3.5 rounded-xl text-sm font-semibold ring-1 transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]"
        style={{
          backgroundColor: value.trim() ? "#a78bfa" : "rgba(255, 255, 255, 0.1)",
          borderColor: "rgba(255, 255, 255, 0.1)",
          color: value.trim() ? "#0f0f1a" : "rgba(255, 255, 255, 0.5)",
        }}
      >
        Verificar
      </button>
    </div>
  );
}

// Modal de información (mejor para móviles que tooltip)
function InfoModal({ text, isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal content */}
      <div
        className="relative w-full max-w-sm rounded-2xl p-5 ring-1 animate-slide-up sm:animate-fade-in"
        style={{
          backgroundColor: "rgba(25, 25, 40, 0.98)",
          borderColor: "rgba(255, 255, 255, 0.15)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 rounded-lg transition-all active:scale-95"
          style={{ color: "rgba(255, 255, 255, 0.5)" }}
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2 mb-3">
          <Info className="h-5 w-5" style={{ color: "#a78bfa" }} />
          <span className="text-sm font-medium" style={{ color: "#a78bfa" }}>
            Información
          </span>
        </div>

        <p
          className="text-sm leading-relaxed whitespace-pre-line"
          style={{ color: "rgba(255, 255, 255, 0.85)" }}
        >
          {text}
        </p>

        <button
          onClick={onClose}
          className="w-full mt-4 px-4 py-2.5 rounded-xl text-sm font-medium transition-all active:scale-[0.98]"
          style={{
            backgroundColor: "rgba(167, 139, 250, 0.2)",
            color: "#a78bfa",
          }}
        >
          Entendido
        </button>
      </div>
    </div>
  );
}

// ========================================
// COMPONENTE PRINCIPAL
// ========================================

export default function DecisionWizard({ onComplete }) {
  // Estados de visibilidad y navegación
  const [isVisible, setIsVisible] = useState(false);
  const [currentView, setCurrentView] = useState("welcome"); // welcome | quiz | context | decision

  // Estado del quiz (Paso 1)
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizError, setQuizError] = useState(null);
  const [phoneValue, setPhoneValue] = useState("");
  const [textValue, setTextValue] = useState("");
  const [infoModalOpen, setInfoModalOpen] = useState(false);

  // Estado del contexto (Paso 2)
  const [contextChecked, setContextChecked] = useState(false);

  // Touch/swipe para el carrusel
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  // Animación de entrada
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  // Pregunta actual del quiz
  const currentQuestion = QUIZ_QUESTIONS[quizIndex];
  const isLastQuestion = quizIndex === QUIZ_QUESTIONS.length - 1;
  const isFirstQuestion = quizIndex === 0;

  // Handlers del quiz
  const validateQuizAnswer = useCallback(() => {
    const q = currentQuestion;
    setQuizError(null);

    if (q.type === "multiple") {
      const answer = quizAnswers[q.id];
      if (answer === q.correctAnswer) {
        if (isLastQuestion) {
          setCurrentView("context");
        } else {
          setQuizIndex(quizIndex + 1);
        }
        return true;
      }
      setQuizError(q.errorMessage);
      return false;
    }

    if (q.type === "phone") {
      if (validateNumber(phoneValue)) {
        setQuizAnswers({ ...quizAnswers, [q.id]: phoneValue });
        if (isLastQuestion) {
          setCurrentView("context");
        } else {
          setQuizIndex(quizIndex + 1);
          setPhoneValue("");
        }
        return true;
      }
      setQuizError(q.errorMessage);
      return false;
    }

    if (q.type === "text") {
      const normalized = textValue.trim().toLowerCase();
      if (normalized === q.correctAnswer.toLowerCase()) {
        setQuizAnswers({ ...quizAnswers, [q.id]: textValue });
        if (isLastQuestion) {
          setCurrentView("context");
        } else {
          setQuizIndex(quizIndex + 1);
          setTextValue("");
        }
        return true;
      }
      setQuizError(q.errorMessage);
      return false;
    }

    return false;
  }, [currentQuestion, quizAnswers, quizIndex, isLastQuestion, phoneValue, textValue]);

  const handleMultipleSelect = (value) => {
    setQuizAnswers({ ...quizAnswers, [currentQuestion.id]: value });
    setQuizError(null);
  };

  // Decisión final
  const handleDecision = (choice) => {
    setIsVisible(false);
    setTimeout(() => {
      onComplete(choice);
    }, 300);
  };

  // Touch handlers para swipe en el quiz
  const handleTouchStart = (e) => {
    if (currentView !== "quiz") return;
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || currentView !== "quiz") return;
    const currentTouch = e.targetTouches[0].clientX;
    setTouchEnd(currentTouch);
    const diff = currentTouch - touchStart;

    // Resistencia en los bordes
    if ((isFirstQuestion && diff > 0) || (isLastQuestion && diff < 0)) {
      setDragOffset(diff * 0.2);
    } else {
      setDragOffset(diff * 0.5);
    }
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd || currentView !== "quiz") {
      setIsDragging(false);
      setDragOffset(0);
      return;
    }

    const distance = touchStart - touchEnd;
    const threshold = 50;

    // Solo permitir swipe hacia atrás (no hacia adelante, eso requiere validación)
    if (distance < -threshold && !isFirstQuestion) {
      setQuizIndex(quizIndex - 1);
      setQuizError(null);
    }

    setIsDragging(false);
    setDragOffset(0);
    setTouchStart(null);
    setTouchEnd(null);
  };

  // ========================================
  // RENDER: VISTA DE BIENVENIDA
  // ========================================
  const renderWelcome = () => (
    <div className="flex flex-col h-full max-h-[85vh] sm:max-h-[90vh]">
      {/* Contenido scrolleable */}
      <div className="flex-1 overflow-y-auto overscroll-contain px-5 sm:px-6 pt-6 pb-4">
        <div className="flex flex-col items-center text-center">
          <div
            className="mb-4 sm:mb-6 rounded-full p-3 sm:p-4 ring-1 shrink-0"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              borderColor: "rgba(255, 255, 255, 0.1)",
            }}
          >
            <Sparkles className="h-8 w-8 sm:h-10 sm:w-10" style={{ color: "#a78bfa" }} />
          </div>

          <h2
            className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6"
            style={{ color: "rgba(255, 255, 255, 0.95)" }}
          >
            {WELCOME_CONTENT.title}
          </h2>

          <div className="space-y-3 sm:space-y-4 max-w-md">
            {WELCOME_CONTENT.lines.map((line, i) => (
              <p
                key={i}
                className="text-[13px] sm:text-sm leading-relaxed"
                style={{ color: "rgba(255, 255, 255, 0.7)" }}
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Botón fijo abajo */}
      <div className="shrink-0 px-5 sm:px-6 pb-5 sm:pb-6 pt-3 border-t border-white/5">
        <button
          onClick={() => handleDecision("yes")}
          className="w-full px-6 py-3.5 rounded-xl text-sm font-semibold transition-all active:scale-[0.98]"
          style={{
            background: "linear-gradient(135deg, #a78bfa 0%, #ec4899 100%)",
            color: "#0f0f1a",
          }}
        >
          {WELCOME_CONTENT.buttonText}
        </button>
      </div>
    </div>
  );

  // ========================================
  // RENDER: QUIZ (PASO 1)
  // ========================================
  const renderQuiz = () => (
    <div
      className="flex flex-col h-full max-h-[85vh] sm:max-h-[90vh]"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Header del quiz */}
      <div className="shrink-0 px-5 sm:px-6 pt-5 sm:pt-6 pb-2">
        <div
          className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs ring-1"
          style={{
            backgroundColor: "rgba(167, 139, 250, 0.15)",
            borderColor: "rgba(167, 139, 250, 0.3)",
            color: "#a78bfa",
          }}
        >
          <HelpCircle className="h-3.5 w-3.5" />
          <span>Nivel Fácil • Pregunta {quizIndex + 1} de {QUIZ_QUESTIONS.length}</span>
        </div>
      </div>

      {/* Carrusel de preguntas */}
      <div className="flex-1 overflow-hidden">
        <div
          className={`flex h-full ${isDragging ? "" : "transition-transform duration-300 ease-out"}`}
          style={{
            transform: `translateX(calc(-${quizIndex * 100}% + ${dragOffset}px))`,
          }}
        >
          {QUIZ_QUESTIONS.map((q, idx) => (
            <div key={q.id} className="flex-none w-full h-full overflow-y-auto overscroll-contain px-5 sm:px-6 py-4">
              <div className="flex flex-col items-center text-center">
                {/* Pregunta */}
                <h3
                  className="text-base sm:text-lg font-semibold mb-3 leading-snug"
                  style={{ color: "rgba(255, 255, 255, 0.95)" }}
                >
                  {q.text}
                  {q.infoText && (
                    <button
                      onClick={() => setInfoModalOpen(true)}
                      className="inline-flex items-center justify-center ml-2 p-1 rounded-full transition-all active:scale-95"
                      style={{ color: "rgba(167, 139, 250, 0.8)" }}
                    >
                      <Info className="h-5 w-5" />
                    </button>
                  )}
                </h3>

                {/* Hint si existe */}
                {q.hint && (
                  <div
                    className="flex items-center gap-2 mb-4 px-3 py-2 rounded-lg text-xs"
                    style={{
                      backgroundColor: "rgba(236, 72, 153, 0.15)",
                      color: "rgba(236, 72, 153, 0.9)",
                    }}
                  >
                    <Info className="h-4 w-4 shrink-0" />
                    <span>{q.hint}</span>
                  </div>
                )}

                {/* Error message */}
                {quizError && idx === quizIndex && (
                  <div
                    className="mb-4 px-4 py-2.5 rounded-xl text-sm"
                    style={{
                      backgroundColor: "rgba(239, 68, 68, 0.15)",
                      color: "rgba(239, 68, 68, 0.9)",
                    }}
                  >
                    {quizError}
                  </div>
                )}

                {/* Opciones según tipo */}
                <div className="w-full max-w-xs mt-2">
                  {q.type === "multiple" && (
                    <div className="space-y-2.5">
                      {q.options.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => handleMultipleSelect(opt.value)}
                          className={`w-full px-4 py-3.5 rounded-xl text-sm font-medium transition-all ring-1 active:scale-[0.98] ${
                            quizAnswers[q.id] === opt.value ? "ring-2" : ""
                          }`}
                          style={{
                            backgroundColor:
                              quizAnswers[q.id] === opt.value
                                ? "rgba(167, 139, 250, 0.2)"
                                : "rgba(255, 255, 255, 0.05)",
                            borderColor:
                              quizAnswers[q.id] === opt.value
                                ? "#a78bfa"
                                : "rgba(255, 255, 255, 0.1)",
                            color:
                              quizAnswers[q.id] === opt.value
                                ? "#a78bfa"
                                : "rgba(255, 255, 255, 0.8)",
                          }}
                        >
                          {opt.label}
                        </button>
                      ))}

                      {/* Botón verificar para multiple choice */}
                      {quizAnswers[q.id] && idx === quizIndex && (
                        <button
                          onClick={validateQuizAnswer}
                          className="w-full mt-3 px-6 py-3.5 rounded-xl text-sm font-semibold transition-all active:scale-[0.98]"
                          style={{
                            backgroundColor: "#a78bfa",
                            color: "#0f0f1a",
                          }}
                        >
                          {isLastQuestion ? "Continuar" : "Verificar"}
                        </button>
                      )}
                    </div>
                  )}

                  {q.type === "phone" && idx === quizIndex && (
                    <PhoneInput
                      value={phoneValue}
                      onChange={setPhoneValue}
                      onSubmit={validateQuizAnswer}
                      disabled={false}
                    />
                  )}

                  {q.type === "text" && idx === quizIndex && (
                    <TextInput
                      value={textValue}
                      onChange={setTextValue}
                      onSubmit={validateQuizAnswer}
                      disabled={false}
                      placeholder="Escribe el apodo..."
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer con indicadores y navegación */}
      <div className="shrink-0 px-5 sm:px-6 pb-5 sm:pb-6 pt-3 border-t border-white/5">
        {/* Indicadores de progreso */}
        <div className="flex justify-center gap-2 mb-4">
          {QUIZ_QUESTIONS.map((_, idx) => (
            <div
              key={idx}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: idx === quizIndex ? "24px" : "8px",
                backgroundColor:
                  idx === quizIndex
                    ? "#a78bfa"
                    : idx < quizIndex
                    ? "rgba(167, 139, 250, 0.5)"
                    : "rgba(255, 255, 255, 0.2)",
              }}
            />
          ))}
        </div>

        {/* Botón atrás */}
        <div className="flex justify-center">
          <button
            onClick={() => {
              if (!isFirstQuestion) {
                setQuizIndex(quizIndex - 1);
                setQuizError(null);
              }
            }}
            disabled={isFirstQuestion}
            className="rounded-xl px-5 py-2.5 text-sm font-medium ring-1 transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              borderColor: "rgba(255, 255, 255, 0.1)",
              color: "rgba(255, 255, 255, 0.8)",
            }}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Modal de información */}
      <InfoModal
        text={currentQuestion?.infoText || ""}
        isOpen={infoModalOpen}
        onClose={() => setInfoModalOpen(false)}
      />
    </div>
  );

  // ========================================
  // RENDER: CONTEXTO (PASO 2)
  // ========================================
  const renderContext = () => (
    <div className="flex flex-col h-full max-h-[85vh] sm:max-h-[90vh]">
      {/* Contenido scrolleable */}
      <div className="flex-1 overflow-y-auto overscroll-contain px-5 sm:px-6 pt-6 pb-4">
        <div className="flex flex-col items-center text-center">
          <div
            className="mb-4 sm:mb-6 rounded-full p-3 sm:p-4 ring-1 shrink-0"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              borderColor: "rgba(255, 255, 255, 0.1)",
            }}
          >
            <MessageCircle className="h-8 w-8 sm:h-10 sm:w-10" style={{ color: "#a78bfa" }} />
          </div>

          <h2
            className="text-lg sm:text-xl font-bold mb-4"
            style={{ color: "rgba(255, 255, 255, 0.95)" }}
          >
            Contexto Importante
          </h2>

          {/* Área de texto de contexto */}
          <div
            className="w-full mb-4 p-4 rounded-xl ring-1 text-left text-[13px] sm:text-sm leading-relaxed"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.03)",
              borderColor: "rgba(255, 255, 255, 0.1)",
              color: "rgba(255, 255, 255, 0.7)",
            }}
          >
            {CONTEXT_CONTENT.text}
          </div>
        </div>
      </div>

      {/* Footer con checkbox y botón */}
      <div className="shrink-0 px-5 sm:px-6 pb-5 sm:pb-6 pt-3 border-t border-white/5">
        {/* Checkbox - área táctil grande */}
        <button
          onClick={() => setContextChecked(!contextChecked)}
          className="w-full flex items-center gap-3 mb-4 p-3 rounded-xl transition-all active:scale-[0.99]"
          style={{
            backgroundColor: contextChecked ? "rgba(167, 139, 250, 0.1)" : "rgba(255, 255, 255, 0.03)",
            color: "rgba(255, 255, 255, 0.85)",
          }}
        >
          <div
            className={`w-6 h-6 rounded-lg ring-1 flex items-center justify-center transition-all shrink-0 ${
              contextChecked ? "ring-2" : ""
            }`}
            style={{
              backgroundColor: contextChecked ? "rgba(167, 139, 250, 0.2)" : "rgba(255, 255, 255, 0.05)",
              borderColor: contextChecked ? "#a78bfa" : "rgba(255, 255, 255, 0.15)",
            }}
          >
            {contextChecked && <CheckCircle2 className="h-4 w-4" style={{ color: "#a78bfa" }} />}
          </div>
          <span className="text-sm text-left">✅ {CONTEXT_CONTENT.checkboxLabel}</span>
        </button>

        {/* Botón continuar */}
        <button
          onClick={() => setCurrentView("decision")}
          disabled={!contextChecked}
          className="w-full px-6 py-3.5 rounded-xl text-sm font-semibold ring-1 transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]"
          style={{
            backgroundColor: contextChecked ? "#a78bfa" : "rgba(255, 255, 255, 0.1)",
            borderColor: "rgba(255, 255, 255, 0.1)",
            color: contextChecked ? "#0f0f1a" : "rgba(255, 255, 255, 0.5)",
          }}
        >
          {CONTEXT_CONTENT.buttonText}
        </button>
      </div>
    </div>
  );

  // ========================================
  // RENDER: DECISIÓN FINAL (PASO 3)
  // ========================================
  const renderDecision = () => (
    <div className="flex flex-col h-full max-h-[85vh] sm:max-h-[90vh]">
      {/* Contenido scrolleable */}
      <div className="flex-1 overflow-y-auto overscroll-contain px-5 sm:px-6 pt-6 pb-4">
        <div className="flex flex-col items-center text-center">
          <div
            className="mb-4 sm:mb-6 rounded-full p-3 sm:p-4 ring-1 shrink-0"
            style={{
              backgroundColor: "rgba(236, 72, 153, 0.1)",
              borderColor: "rgba(236, 72, 153, 0.2)",
            }}
          >
            <Heart className="h-8 w-8 sm:h-10 sm:w-10" style={{ color: "#ec4899" }} />
          </div>

          <h2
            className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6"
            style={{ color: "rgba(255, 255, 255, 0.95)" }}
          >
            {DECISION_CONTENT.title}
          </h2>

          <div className="space-y-3 max-w-md">
            {DECISION_CONTENT.lines.map((line, i) => (
              <p
                key={i}
                className="text-[13px] sm:text-sm leading-relaxed"
                style={{ color: "rgba(255, 255, 255, 0.75)" }}
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Botones de decisión fijos abajo */}
      <div className="shrink-0 px-5 sm:px-6 pb-5 sm:pb-6 pt-3 border-t border-white/5">
        <div className="space-y-3">
          <button
            onClick={() => handleDecision("yes")}
            className="w-full px-6 py-4 rounded-xl text-base font-semibold transition-all active:scale-[0.98]"
            style={{
              background: "linear-gradient(135deg, #ec4899 0%, #f59e0b 100%)",
              color: "#0f0f1a",
            }}
          >
            {DECISION_CONTENT.yesButton}
          </button>
          <button
            onClick={() => handleDecision("no")}
            className="w-full px-6 py-4 rounded-xl text-base font-medium transition-all ring-1 active:scale-[0.98]"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              borderColor: "rgba(255, 255, 255, 0.15)",
              color: "rgba(255, 255, 255, 0.7)",
            }}
          >
            {DECISION_CONTENT.noButton}
          </button>
        </div>
      </div>
    </div>
  );

  // ========================================
  // RENDER PRINCIPAL
  // ========================================
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 transition-all duration-300 ${
        isVisible ? "bg-black/70 backdrop-blur-lg" : "bg-black/0"
      }`}
      style={{ touchAction: "pan-y" }}
    >
      {/* Fondo con gradiente sutil */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(139, 92, 246, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)",
        }}
      />

      {/* Card principal */}
      <div
        className={`relative w-full max-w-lg overflow-hidden rounded-2xl sm:rounded-3xl ring-1 transition-all duration-300 ease-out ${
          isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"
        }`}
        style={{
          backgroundColor: "rgba(15, 15, 25, 0.98)",
          borderColor: "rgba(255, 255, 255, 0.1)",
          maxHeight: "92vh",
        }}
      >
        {/* Botón de reiniciar (esquina superior derecha, discreto) */}
        <button
          onClick={() => {
            setCurrentView("welcome");
            setQuizIndex(0);
            setQuizAnswers({});
            setQuizError(null);
            setPhoneValue("");
            setTextValue("");
            setContextChecked(false);
          }}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 rounded-lg transition-all opacity-30 active:opacity-60"
          style={{ color: "rgba(255, 255, 255, 0.6)" }}
        >
          <RotateCcw className="h-4 w-4" />
        </button>

        {/* Contenido según vista actual */}
        {currentView === "welcome" && renderWelcome()}
        {currentView === "quiz" && renderQuiz()}
        {currentView === "context" && renderContext()}
        {currentView === "decision" && renderDecision()}
      </div>

      {/* Estilos para animaciones */}
      <style>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.2s ease-out;
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}
