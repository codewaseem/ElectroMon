import { diffArrayObject } from "../utils";

export default class HistoryTracker<T> implements HistoryTrackable<T> {
  #history: T[] = [];
  #accessedHistory: T[] = [];

  constructor(initialHistory: T[]) {
    this.#history = initialHistory;
  }

  push(item: T): void {
    this.#history.push(item);
  }

  getFullHistory(): T[] {
    return this.#history.slice();
  }

  getChangedHistory(): T[] {
    const newHistory = diffArrayObject<T>(
      this.#accessedHistory,
      this.#history
    );

    this.#accessedHistory = newHistory;

    return newHistory;
  }

  deleteFullHistory(): void {
    this.#history = [];
  }
}
