export class StorageService {
  key: string;
  constructor(key: string) {
    this.key = key;
  }

  set<T>(value: T): void {
    window.localStorage.setItem(this.key, JSON.stringify(value));
  }

  get<T>(): T | null {
    const item = window.localStorage.getItem(this.key);
    if (!item) return null;
    return JSON.parse(item) satisfies T;
  }

  remove(): void {
    window.localStorage.removeItem(this.key);
  }
}
