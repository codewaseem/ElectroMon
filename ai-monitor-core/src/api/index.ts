import axios from "axios";
import { AppsUsageLogs } from "../activity-tracker/AppTracker";

export const BASE_URL = "https://api.dev.aptask.com";
export const PULSE_AUTH_URL = "/api/v1/users/pulse-two/login";

export const LOGIN_URL = BASE_URL + PULSE_AUTH_URL;

export const MONITOR_API_URL = `${BASE_URL}/api/v1/apps/ai-monitor`;
export const ADD_LEAVE_URL = `${MONITOR_API_URL}/leaves`;
export const ADD_TIME_LOG = `${MONITOR_API_URL}/logs`
export const GET_USER_PROFILE = `${MONITOR_API_URL}/profiles`;
export const USAGE_LOGS = `${MONITOR_API_URL}/process-logs`;


export interface PulseTwoContext {
    token: string
}

export interface UserInfo {
    id: string,
    email: string,
    pulseTwoId: number,
    pulseTwoContext: PulseTwoContext
}

export interface PulseLoginResponse {
    data: UserInfo & {
        pulseTwoContext: string
    }
    code: 200
}

export interface PulseLoginErrorResponse {
    message: string
    code: 500,
}

export interface Leave {
    reason: string,
    startTime: string | number,
    endTime: string | number,
}

export interface AuthUserInfo {
    token: string,
    userId: string
}

export interface TimeLog {
    logType: "WORK" | "COFFEE" | "LUNCH",
    startTime: number,
    endTime: number,
    duration: number,
    manual?: boolean
}

export interface UserProfileObject {
    id: number | string,
    trackKeyStrokes: boolean,
    trackWebSites: boolean,
    trackApps: boolean,
    takeScreenShots: boolean,
    canApplyForLeave: boolean,
    trackStartTime: string | null,
    trackEndTime: string | null,
    trackWeekends: boolean,
    isAptaskEmployee: boolean,
    userId: number
}

class AiMonitorApi {

    #authInfo!: AuthUserInfo | null;
    #user!: UserInfo | null;

    #getAuthHeaders = () => {
        return {
            Authorization: `Bearer ${this.#authInfo!.token}`,
            Accept: `application/json, text/plain, */*`,
            "Content-Type": `application/json;charset=utf-8`
        }
    }

    #isAuthInfoSet = () => {
        return this.#authInfo?.userId && this.#authInfo.token;
    }

    setAuthInfo(info: AuthUserInfo) {
        this.#authInfo = info;
    }

    setUser(userInfo: UserInfo) {
        this.#user = userInfo;
    }

    getUser(): UserInfo | null {
        return this.#user;
    }

    async getUserProfile(): Promise<UserProfileObject | undefined> {
        if (!this.#isAuthInfoSet()) return Promise.reject();
        return axios({
            url: GET_USER_PROFILE,
            method: "GET",
            headers: this.#getAuthHeaders(),
            params: {
                userId: this.#user?.id
            }
        }).then(r => r.data).then(data => data[0] as UserProfileObject | undefined);
    }


    async pushUsageLogs(logs: AppsUsageLogs): Promise<any> {
        // if (!this.#isAuthInfoSet()) return Promise.reject();

        // return axios({
        //     url: USAGE_LOGS,
        //     method: "POST",
        //     headers: this.#getAuthHeaders(),
        // });
    }

    async login(userName: string, password: string): Promise<any> {

        const data: PulseLoginResponse | PulseLoginErrorResponse = await axios({
            url: LOGIN_URL,
            method: 'POST',
            data: {
                userName,
                password
            }
        }).then((r) => r.data);

        if (data.code == 500) {
            throw new Error('Login Failed! Please check your Pulse email and/or password or send an email to support@aptask.com');
        }

        else if (data.code == 200 && data.data && data.data.id) {
            const user = data.data;
            const pulseTwoContext = (typeof user.pulseTwoContext == "string" ? JSON.parse(user.pulseTwoContext) as PulseTwoContext : user.pulseTwoContext);

            this.setAuthInfo({
                userId: user.id,
                token: pulseTwoContext.token
            });

            this.setUser({
                ...user,
                pulseTwoContext
            });

            return user;
        }

        throw new Error("Should have not reached here!");
    }

    logout() {
        this.setAuthInfo(null as any);
        this.setUser(null as any);
    }


    async addLeave(leave: Leave): Promise<any> {

        if (!this.#isAuthInfoSet()) return Promise.reject();
        const profile = await this.getUserProfile();
        if (profile?.canApplyForLeave) {
            return axios({
                url: ADD_LEAVE_URL,
                method: "POST",
                headers: this.#getAuthHeaders(),
                data: [{ userId: this.#authInfo!.userId, ...leave }]
            })
        } else {
            throw new Error("Not allowed to apply for leaves");
        }

    }

    async addTime(timeLogs: TimeLog[]): Promise<any> {

        if (!this.#isAuthInfoSet()) return Promise.reject();

        timeLogs.forEach(log => (log as TimeLog & { userId: string }).userId = this.#authInfo!.userId);

        return axios({
            url: ADD_TIME_LOG,
            method: "POST",
            headers: this.#getAuthHeaders(),
            data: timeLogs
        });
    }

}

export type AiMonitorApiInterface = typeof AiMonitorApi;

export default new AiMonitorApi();