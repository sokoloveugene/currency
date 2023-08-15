export interface IStorage {
  set(key: string, value: unknown): void;
  get<T>(key: string): T;
  delete(key: string): void;
}

export class Storage implements IStorage {
  set(key: string, value: unknown) {
    if (value !== undefined) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  get<T>(key: string): T {
    const value = localStorage.getItem(key);
    if (value) return JSON.parse(value);
    return null;
  }

  delete(key: string) {
    localStorage.removeItem(key);
  }
}
