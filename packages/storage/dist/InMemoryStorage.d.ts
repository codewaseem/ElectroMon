export default class InMemoryStorage implements IStorageGateway {
  #private;
  saveTimeLogs(timeLogs: TimeLogHistory[]): Promise<void>;
  getTimeLogs(): Promise<TimeLogHistory[]>;
  getUsageHistory(): Promise<UsageHistory[]>;
  saveUsageHistory(history: UsageHistory[]): Promise<void>;
  saveStopWatchState(state: NamedStopWatchesData): Promise<void>;
  getStopWatchState(): Promise<NamedStopWatchesData | undefined>;
  saveActivityTrackerState(state: ActivityTrackerData): Promise<void>;
  getActivityTrackerState(): Promise<ActivityTrackerData | undefined>;
}
//# sourceMappingURL=InMemoryStorage.d.ts.map
