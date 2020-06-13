// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import level from "level";

const TIME_LOG = "TIME_LOG";
const USAGE_LOG = "USAGE_LOG";
const STOPWATCh_STATE = "STOPWATCH_STATE";
const TRACKER_STATE = "TRACKER_STATE";

const DB_NAME = "__appdata__";

export default class LevelDBStorage implements IStorageGateway {
  #timeLogs: TimeLogHistory[] = [];
  #usageLogs: UsageHistory[] = [];
  #db: any;

  constructor() {
    this.#db = level(DB_NAME);
  }

  async saveTimeLogs(timeLogs: TimeLogHistory[]): Promise<void> {
    this.#timeLogs.push(...timeLogs);
    await this.#db.put(TIME_LOG, JSON.stringify(this.#timeLogs));
  }

  async getTimeLogs(): Promise<TimeLogHistory[]> {
    const data = await this.#db.get(TIME_LOG);
    return JSON.parse(data);
  }

  async getUsageHistory(): Promise<UsageHistory[]> {
    const data = await this.#db.get(USAGE_LOG);
    return JSON.parse(data);
  }

  async saveUsageHistory(history: UsageHistory[]): Promise<void> {
    this.#usageLogs.push(...history);
    await this.#db.put(USAGE_LOG, JSON.stringify(this.#usageLogs));
  }

  async saveStopWatchState(state: NamedStopWatchesData): Promise<void> {
    await this.#db.put(STOPWATCh_STATE, JSON.stringify(state));
  }

  async getStopWatchState(): Promise<NamedStopWatchesData | undefined> {
    const data = await this.#db.get(STOPWATCh_STATE);
    return data ? JSON.parse(data) : undefined;
  }

  async saveActivityTrackerState(state: ActivityTrackerData): Promise<void> {
    await this.#db.put(TRACKER_STATE, JSON.stringify(state));
  }

  async getActivityTrackerState(): Promise<ActivityTrackerData | undefined> {
    const data = await this.#db.get(TRACKER_STATE);
    return data ? JSON.parse(data) : undefined;
  }
}
