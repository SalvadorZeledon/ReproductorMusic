// Sistema de modos: YES (esperanzador) y NO (melancólico)
// Cada modo tiene su propia configuración, tracks y estado persistido

import { YES_CONFIG, YES_TRACKS } from "./yes";
import { NO_CONFIG, NO_TRACKS } from "./no";

// Key para guardar el modo elegido en localStorage
export const MODE_KEY = "dedicatoria-player:mode:v1";

// Modos disponibles
export const MODES = {
  yes: {
    config: YES_CONFIG,
    tracks: YES_TRACKS,
  },
  no: {
    config: NO_CONFIG,
    tracks: NO_TRACKS,
  },
};

// Genera la key de localStorage para el estado del reproductor según el modo
export const getPlayerLSKey = (mode) => `dedicatoria-player:${mode}:v1`;

// Genera la key de localStorage para el onboarding según el modo
export const getOnboardingLSKey = (mode) => `kuskatan_onboarding_${mode}_v1`;

// Obtiene el modo guardado (o null si no hay)
export const getSavedMode = () => {
  try {
    const mode = localStorage.getItem(MODE_KEY);
    if (mode === "yes" || mode === "no") return mode;
    return null;
  } catch {
    return null;
  }
};

// Guarda el modo elegido
export const saveMode = (mode) => {
  try {
    localStorage.setItem(MODE_KEY, mode);
  } catch {
    // ignore
  }
};

// Borra el modo (para volver al wizard)
export const clearMode = () => {
  try {
    localStorage.removeItem(MODE_KEY);
  } catch {
    // ignore
  }
};

// Obtiene configuración y tracks del modo actual
export const getModeData = (mode) => {
  if (!mode || !MODES[mode]) return null;
  return MODES[mode];
};
