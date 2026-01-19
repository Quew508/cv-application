import { useState, useEffect } from "react";

function getStorageValue(key: string, initialValue: any) {
  if (typeof window === "undefined") {
    return initialValue
  }
  const savedValue = localStorage.getItem(key)
  return savedValue ? JSON.parse(savedValue) : initialValue;
}

export const useLocalStorage = (key: string, initialValue: any) => {
  const [value, setValue] = useState(() => getStorageValue(key, initialValue));
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue] as const;
}
