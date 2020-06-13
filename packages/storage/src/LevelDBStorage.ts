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
    try {
      this.#timeLogs.push(...timeLogs);
      await this.#db.put(TIME_LOG, JSON.stringify(this.#timeLogs));
    } catch (e) {
      console.log("KEY NOT FOUND! CREATING NEW ONE");
    }
  }

  async getTimeLogs(): Promise<TimeLogHistory[]> {
    let data = [];
    try {
      const strData = await this.#db.get(TIME_LOG);
      data = JSON.parse(strData);
    } catch (e) {
      console.log("Data not found");
    }
    return data;
  }

  async getUsageHistory(): Promise<UsageHistory[]> {
    let data = [];
    try {
      const strData = await this.#db.get(USAGE_LOG);
      data = JSON.parse(strData);
    } catch (e) {
      console.log("Data not found");
    }
    return data;
  }

  async saveUsageHistory(history: UsageHistory[]): Promise<void> {
    try {
      this.#usageLogs.push(...history);
      await this.#db.put(USAGE_LOG, JSON.stringify(this.#usageLogs));
    } catch (e) {
      console.log("Key not found! Creating new");
    }
  }

  async saveStopWatchState(state: NamedStopWatchesData): Promise<void> {
    try {
      await this.#db.put(STOPWATCh_STATE, JSON.stringify(state));
    } catch (e) {
      console.log("Key not found! Creating new");
    }
  }

  async getStopWatchState(): Promise<NamedStopWatchesData | undefined> {
    let data = undefined;
    try {
      const strData = await this.#db.get(STOPWATCh_STATE);
      data = strData ? JSON.parse(strData) : undefined;
    } catch (e) {
      console.log("No data found!");
    }
    return data;
  }

  async saveActivityTrackerState(state: ActivityTrackerData): Promise<void> {
    try {
      await this.#db.put(TRACKER_STATE, JSON.stringify(state));
    } catch (e) {
      console.log("Data not found");
    }
  }

  async getActivityTrackerState(): Promise<ActivityTrackerData | undefined> {
    let data = [];
    try {
      const strData = await this.#db.get(TRACKER_STATE);
      data = strData ? JSON.parse(strData) : undefined;
    } catch (e) {
      console.log("Key not found!");
    }
    return data;
  }
}
