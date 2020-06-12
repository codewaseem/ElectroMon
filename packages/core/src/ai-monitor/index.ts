import AiMonitorStopWatch from "../stopwatch/AiMonitorStopWatch";

export const ErrorMessages = {
  notLoggedIn: "Not Logged In: Please Login first.",
};

export default class AiMonitor implements IAiMonitor {
  #aiMonitorApi: IAiMonitorApi;
  #stopwatch: AiMonitorStopWatch;
  #activityTracker: IActivityTracker;
  #storageGateway: IStorageGateway;

  #user?: UserInfo;

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
  }) {
    this.#aiMonitorApi = aiMonitorApi;
    this.#activityTracker = activityTracker;
    this.#stopwatch = stopwatch;
    this.#storageGateway = storageGateway;
  }
  async startWork(): Promise<void> {
    this.throwIfUserNotSet();

    this.#stopwatch.startWork();
    this.#activityTracker.startTracking();
  }
  async startCoffeeBreak(): Promise<void> {
    this.throwIfUserNotSet();
    await this.stop();
    this.#stopwatch.startCoffee();
  }

  async startLunchBreak(): Promise<void> {
    this.throwIfUserNotSet();
    await this.stop();
    this.#stopwatch.startLunch();
  }

  async stop(): Promise<void> {
    this.#stopwatch.stop();
    this.#activityTracker.stopTracking();

    await this.syncData();
  }

  addManualTime(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  applyForLeave(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async logout(): Promise<void> {
    if (!this.#user) return;

    await this.stop();
    await this.#aiMonitorApi.logout();

    this.#user = undefined;
  }

  async login(email: string, password: string): Promise<void> {
    const user = await this.#aiMonitorApi.login(email, password);
    this.#stopwatch.setUser(user);

    const state = await this.#storageGateway.getSavedStopWatchState();
    this.#stopwatch.setInitialState(state);

    await this.#activityTracker.init(user);

    this.#user = user;
  }

  private async syncData() {
    const timeLogs = this.#stopwatch.getLastSessionHistory();
    const usageLogs = this.#activityTracker.getLastSessionHistory();

    await Promise.all([
      this.#aiMonitorApi.addTimeLogs(timeLogs),
      this.#aiMonitorApi.addUsageLogs(usageLogs),
      this.#storageGateway.saveTimeLogs(timeLogs),
      this.#storageGateway.saveUsageHistory(usageLogs),
      this.#storageGateway.saveStopWatchState(this.#stopwatch.toJSON()),
    ]);
  }

  private throwIfUserNotSet() {
    if (!this.#user || !this.#user.id) {
      throw ErrorMessages.notLoggedIn;
    }
  }
}
