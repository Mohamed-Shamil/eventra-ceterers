import { MENU as INITIAL_MENU, BRANCHES as INITIAL_BRANCHES, SETTINGS as INITIAL_SETTINGS, COUNTER_TYPES as INITIAL_COUNTERS, STAGE_PACKAGES as INITIAL_STAGES } from "./MenuData";

const STORAGE_KEY = "eventra_data";

export const getAppData = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error("Failed to parse stored data", e);
    }
  }
  return {
    menu: INITIAL_MENU,
    branches: INITIAL_BRANCHES,
    settings: INITIAL_SETTINGS,
    counterTypes: INITIAL_COUNTERS,
    stagePackages: INITIAL_STAGES
  };
};

export const saveAppData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const resetAppData = () => {
  localStorage.removeItem(STORAGE_KEY);
  window.location.reload();
};
