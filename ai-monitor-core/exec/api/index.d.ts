export declare const BASE_URL = "https://api.dev.aptask.com";
export declare const PULSE_AUTH_URL = "/api/v1/users/pulse-two/login";
export declare const LOGIN_URL: string;
export declare const MONITOR_API_URL: string;
export declare const ADD_LEAVE_URL: string;
export declare const ADD_TIME_LOG: string;
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
declare class AiMonitorApi {
    #private;
    setAuthInfo(info: AuthUserInfo): void;
    setUser(userInfo: UserInfo): void;
    getUser(): UserInfo | null;
    login(userName: string, password: string): Promise<any>;
    logout(): void;
    addLeave(leave: Leave): Promise<any>;
    addTime(timeLogs: TimeLog[]): Promise<any>;
}
export declare type AiMonitorApiInterface = typeof AiMonitorApi;
declare const _default: AiMonitorApi;
export default _default;
//# sourceMappingURL=index.d.ts.map