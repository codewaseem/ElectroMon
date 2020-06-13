import AiMonitorStopWatch from "./stopwatch/AiMonitorStopWatch";
export declare const ErrorMessages: {
  notLoggedIn: string;
};
export default class AiMonitor implements IAiMonitor {
  #private;
  constructor({
    aiMonitorApi,
    activityTracker,
    storageGateway,
  }: {
    aiMonitorApi: IAiMonitorApi;
    activityTracker: IActivityTracker;
    storageGateway: IStorageGateway;
  });
  login(email: string, password: string): Promise<void>;
  startWork(): Promise<void>;
  startCoffeeBreak(): Promise<void>;
  startLunchBreak(): Promise<void>;
  stop(): Promise<void>;
  logout(): Promise<void>;
  getStopWatch(): AiMonitorStopWatch;
  addManualTime(): Promise<void>;
  applyForLeave(): Promise<void>;
  private syncData;
  private throwIfUserNotSet;
}
//# sourceMappingURL=index.d.ts.map
