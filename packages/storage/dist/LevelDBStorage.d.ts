export default class LevelDBStorage implements IStorageGateway {
  #private;
  constructor();
  saveTimeLogs(timeLogs: TimeLogHistory[]): Promise<void>;
  getTimeLogs(): Promise<TimeLogHistory[]>;
  getUsageHistory(): Promise<UsageHistory[]>;
  saveUsageHistory(history: UsageHistory[]): Promise<void>;
  saveStopWatchState(state: NamedStopWatchesData): Promise<void>;
  getStopWatchState(): Promise<NamedStopWatchesData | undefined>;
  saveActivityTrackerState(state: ActivityTrackerData): Promise<void>;
  getActivityTrackerState(): Promise<ActivityTrackerData | undefined>;
}
//# sourceMappingURL=LevelDBStorage.d.ts.map
