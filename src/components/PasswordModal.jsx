import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";

const CORRECT_PASSWORD = "Capuchino";
const SESSION_KEY = "music-player:auth";

export function isAuthenticated() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === "true";
  } catch {
    return false;
  }
}

export default function PasswordModal({ onUnlock }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value === CORRECT_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "true");
      onUnlock();
    } else {
      setError(true);
      setValue("");
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div
        className="relative w-full max-w-sm rounded-3xl p-8 ring-1 animate-in fade-in zoom-in-95 duration-300"
        style={{
          backgroundColor: "rgba(15, 23, 42, 0.90)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderColor: "rgba(255, 255, 255, 0.15)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.6), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)",
        }}
      >
        <div className="text-center mb-6">
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4"
            style={{ backgroundColor: "rgba(167, 139, 250, 0.15)", border: "1px solid rgba(167, 139, 250, 0.3)" }}
          >
            <Lock className="w-6 h-6" style={{ color: "#a78bfa" }} />
          </div>
          <h2 className="text-xl font-semibold" style={{ color: "rgba(255,255,255,0.95)" }}>
            Acceso privado
          </h2>
          <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>
            Ingresa la contraseña para continuar
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              autoFocus
              type={showPw ? "text" : "password"}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Contraseña"
              className="w-full rounded-2xl px-4 py-3 pr-12 text-sm outline-none transition-all"
              style={{
                backgroundColor: "rgba(255,255,255,0.07)",
                border: `1px solid ${error ? "rgba(239,68,68,0.7)" : "rgba(255,255,255,0.15)"}`,
                color: "rgba(255,255,255,0.9)",
                caretColor: "#a78bfa",
              }}
            />
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/10 transition-colors"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {error && (
            <p className="text-xs text-center" style={{ color: "rgba(239,68,68,0.9)" }}>
              Contraseña incorrecta, intenta de nuevo.
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-2xl font-medium text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: "linear-gradient(135deg, #a78bfa 0%, #ec4899 100%)",
              color: "#fff",
              boxShadow: "0 4px 14px 0 rgba(167, 139, 250, 0.35)",
            }}
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
