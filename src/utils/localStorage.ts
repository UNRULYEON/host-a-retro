export const getLocalStorage = <T>(key: string): T | null => {
  const value = localStorage.getItem(key);
  if (value) {
    try {
      return JSON.parse(value);
    } catch {
      return value as T;
    }
  }
  return null;
};

export const setLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

export default {
  get: getLocalStorage,
  set: setLocalStorage,
  remove: removeLocalStorage,
} as const;
