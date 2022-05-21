export const isBrowser = typeof window !== "undefined";

export function getLocalStorage(key: string): any {
  const storageParsed =
    isBrowser && window.localStorage.getItem(key);
  return storageParsed;
}

export function setLocalStorage(key: string, value: any): void {
  isBrowser && window.localStorage.setItem(key, JSON.stringify(value));
}
