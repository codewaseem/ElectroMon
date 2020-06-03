import { AppsUsageLogger, AppsUsageLogs } from "./AppTracker";
export default class AppDataStore implements AppsUsageLogger {
    private db;
    constructor(dbPathName?: string);
    saveAppUsageLogs(data: AppsUsageLogs): Promise<AppsUsageLogs>;
    getAppUsageLogs(): Promise<AppsUsageLogs>;
}
//# sourceMappingURL=AppDataStore.d.ts.map