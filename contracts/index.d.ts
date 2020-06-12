declare interface IAiMonitor {
  login(username: string, password: string): Promise<void>;
  startWork(): Promise<void>;
  startCoffeeBreak(): Promise<void>;
  startLunchBreak(): Promise<void>;
  stop(): Promise<void>;
  addManualTime(): Promise<void>;
  applyForLeave(): Promise<void>;
  logout(): Promise<void>;
}

declare interface IActivityTracker extends HistoryTrackable<UsageHistory[]> {
  init(user: UserInfo): Promise<void>;
  startTracking(): Promise<void>;
  stopTracking(): Promise<void>;
}

declare interface IStorageGateway {
  saveTimeLogs(timeLogs: TimeLogHistory[]): Promise<void>;
  getTimeLogs(): Promise<TimeLogHistory[]>;
  getUsageHistory(): Promise<UsageHistory[]>;
  saveUsageHistory(history: UsageHistory[]): Promise<void>;
  saveStopWatchState(state: NamedStopWatchesData): Promise<void>;
  getSavedStopWatchState(): Promise<NamedStopWatchesData | undefined>;
}

declare interface IAiMonitorApi {
  login(username: string, password: string): Promise<UserInfo>;
  logout(): Promise<void>;
  addTimeLogs(logs: TimeLogHistory[]): Promise<void>;
  addUsageLogs(logs: UsageHistory[]): Promise<void>;
  applyForLeave(): Promise<void>;
}

declare interface UsageHistory {
  appName: string;
  windowTitle: string;
  timeSpent: Milliseconds;
  idleTime: Milliseconds;
  keystrokes: number;
  mouseclicks: number;
  userId?: string | number;
  sessions: Array<{
    startTime: number;
    endTime: number;
  }>;
}

declare interface TimeLap {
  startTime: number;
  endTime: number;
  duration: number;
}

declare interface StopWatchData {
  laps: TimeLap[];
  isRunning: boolean;
  milliseconds: number;
}

declare interface NamedStopWatchesData {
  [key: string]: StopWatchData;
}

declare interface PulseTwoContext {
  token: string;
}

declare interface UserInfo {
  id: string;
  email: string;
}

declare type MockIt<T> = {
  [P in keyof T]: jest.Mock<ReturnType<P>>;
};

declare interface HistoryTrackable<T> {
  getHistory(): T;
  deleteHistory(): void;
  getLastSessionHistory(): T;
}

declare interface UserAssignable {
  setUser(user: UserInfo);
  getUser(): UserInfo | null;
}

declare type Milliseconds = number;

declare interface TimeLogHistory {
  logType: string;
  startTime: number;
  endTime: number;
  duration: number;
  durationByCount: number;
  userId?: string;
  isManual?: boolean;
}