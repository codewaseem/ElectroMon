export default class HistoryTracker<T> implements HistoryTrackable<T> {
  #private;
  constructor(initialHistory: T[]);
  push(item: T): void;
  getFullHistory(): T[];
  getChangedHistory(): T[];
  deleteFullHistory(): void;
}
//# sourceMappingURL=HistoryTracker.d.ts.map
