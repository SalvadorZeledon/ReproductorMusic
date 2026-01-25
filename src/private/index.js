// ========================================
// Módulo de números privados
// ========================================
// Usa validNumbers.local.js si existe, sino validNumbers.example.js
// NOTA: Debes crear validNumbers.local.js manualmente con los números reales
// ========================================

// Importar ambos módulos - Vite optimizará esto
// El archivo .local.js debe existir para que compile
// Si no existe, crea uno copiando el .example.js
import { VALID_NUMBERS as LOCAL_NUMBERS } from "./validNumbers.local.js";

// Exportar los números
export const VALID_NUMBERS = LOCAL_NUMBERS || [];

// Flag para saber si estamos usando placeholders
export const isUsingPlaceholders = VALID_NUMBERS.every(
  (n) => n === "00000000" || n === "12345678" || n === "87654321"
);

// Mostrar warning si estamos usando placeholders
if (isUsingPlaceholders && typeof console !== "undefined") {
  console.warn(
    "⚠️ [Private] Los números en validNumbers.local.js son placeholders.\n" +
      "   Edita src/private/validNumbers.local.js con los números reales."
  );
}

/**
 * Valida si un número (string de 8 dígitos) coincide con alguno de los válidos
 * @param {string} number - Número a validar (8 dígitos, sin guion)
 * @returns {boolean}
 */
export const validateNumber = (number) => {
  if (!number || typeof number !== "string") return false;
  const normalized = number.replace(/\D/g, "");
  if (normalized.length !== 8) return false;
  return VALID_NUMBERS.includes(normalized);
};
