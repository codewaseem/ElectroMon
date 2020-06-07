import { UsageHistory } from "../activity-tracker/AppTracker";
export declare const BASE_URL: string;
export declare const PULSE_AUTH_URL = "/api/v1/users/pulse-two/login";
export declare const LOGIN_URL: string;
export declare const MONITOR_API_URL: string;
export declare const ADD_LEAVE_URL: string;
export declare const ADD_TIME_LOG: string;
export declare const GET_USER_PROFILE: string;
export declare const USAGE_LOGS: string;
export interface PulseTwoContext {
    token: string;
}
export interface UserInfo {
    id: string;
    email: string;
    pulseTwoId: number;
    pulseTwoContext: PulseTwoContext;
}
export interface PulseLoginResponse {
    data: UserInfo & {
        pulseTwoContext: string;
    };
    code: 200;
}
export interface PulseLoginErrorResponse {
    message: string;
    code: 500;
}
export interface Leave {
    reason: string;
    startTime: string | number;
    endTime: string | number;
}
export interface AuthUserInfo {
    token: string;
    userId: string;
}
export interface TimeLog {
    logType: "WORK" | "COFFEE" | "LUNCH";
    startTime: number;
    endTime: number;
    duration: number;
    manual?: boolean;
}
export interface UserProfileObject {
    id: number | string;
    trackKeyStrokes: boolean;
    trackWebSites: boolean;
    trackApps: boolean;
    takeScreenShots: boolean;
    canApplyForLeave: boolean;
    trackStartTime: string | null;
    trackEndTime: string | null;
    trackWeekends: boolean;
    isAptaskEmployee: boolean;
    userId: number;
}
declare class AiMonitorApi {
    #private;
    private static _singleton;
    private constructor();
    static getInstance(): AiMonitorApi;
    setAuthInfo(info: AuthUserInfo): void;
    setUser(userInfo: UserInfo): void;
    getUser(): UserInfo | null;
    getUserProfile(): Promise<UserProfileObject | undefined>;
    pushAppUsageHistory(logs: UsageHistory[]): Promise<any>;
    login(userName: string, password: string): Promise<{
        user: any;
        profile: UserProfileObject | undefined;
    }>;
    logout(): void;
    addLeave(leave: Leave): Promise<any>;
    addTime(timeLogs: TimeLog[]): Promise<any>;
}
export declare type AiMonitorApiInterface = typeof AiMonitorApi;
declare const _default: AiMonitorApi;
export default _default;
//# sourceMappingURL=index.d.ts.map