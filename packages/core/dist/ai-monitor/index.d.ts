import AiMonitorStopWatch from "../stopwatch/AiMonitorStopWatch";
export declare const ErrorMessages: {
  notLoggedIn: string;
};
export default class AiMonitor implements IAiMonitor {
  #private;
  constructor({
    aiMonitorApi,
    stopwatch,
    activityTracker,
    storageGateway,
  }: {
    aiMonitorApi: IAiMonitorApi;
    stopwatch: AiMonitorStopWatch;
    activityTracker: IActivityTracker;
    storageGateway: IStorageGateway;
  });
  startWork(): Promise<void>;
  startCoffeeBreak(): Promise<void>;
  startLunchBreak(): Promise<void>;
  stop(): Promise<void>;
  addManualTime(): Promise<void>;
  applyForLeave(): Promise<void>;
  logout(): Promise<void>;
  login(email: string, password: string): Promise<void>;
  private syncData;
  private throwIfUserNotSet;
}
//# sourceMappingURL=index.d.ts.map
