export default class InMemoryStorage implements IStorageGateway {
  #timeLogs: TimeLogHistory[] = [];
  #usageLogs: UsageHistory[] = [];
  #stopWatchState?: NamedStopWatchesData;
  #trackerState?: ActivityTrackerData;

  saveTimeLogs(timeLogs: TimeLogHistory[]): Promise<void> {
    this.#timeLogs.push(...timeLogs);
    return Promise.resolve();
  }

  getTimeLogs(): Promise<TimeLogHistory[]> {
    return Promise.resolve(this.#timeLogs);
  }

  getUsageHistory(): Promise<UsageHistory[]> {
    return Promise.resolve(this.#usageLogs);
  }

  saveUsageHistory(history: UsageHistory[]): Promise<void> {
    this.#usageLogs.push(...history);
    return Promise.resolve();
  }

  saveStopWatchState(state: NamedStopWatchesData): Promise<void> {
    this.#stopWatchState = state;
    return Promise.resolve();
  }

  getStopWatchState(): Promise<NamedStopWatchesData | undefined> {
    if (this.#stopWatchState && Object.keys(this.#stopWatchState).length >= 1)
      return Promise.resolve(this.#stopWatchState);
    else return Promise.resolve(undefined);
  }

  saveActivityTrackerState(state: ActivityTrackerData): Promise<void> {
    this.#trackerState = state;
    return Promise.resolve();
  }

  getActivityTrackerState(): Promise<ActivityTrackerData | undefined> {
    if (this.#trackerState && Object.keys(this.#trackerState).length >= 1)
      return Promise.resolve(this.#trackerState);
    else return Promise.resolve(undefined);
  }
}
