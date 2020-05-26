import axios from "axios";

export const BASE_URL = "https://api.dev.aptask.com";
export const PULSE_AUTH_URL = "/api/v1/users/pulse-two/login";

export const LOGIN_URL = BASE_URL + PULSE_AUTH_URL;

export const MONITOR_API_URL = `${BASE_URL}/api/v1/apps/monitor`;
export const ADD_LEAVE_URL = `${MONITOR_API_URL}/leaves`;
export const ADD_TIME_LOG = `${MONITOR_API_URL}/logs`


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
    data: {
        data: UserInfo & {
            pulseTwoContext: string
        }
    }
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

    async login(userName: string, password: string): Promise<any> {

        const user = await axios({
            url: LOGIN_URL,
            method: 'POST',
            data: {
                userName,
                password
            }
        }).then((r: PulseLoginResponse) => r.data.data);


        if (!user || !user.id || !user.pulseTwoContext) {
            throw new Error('Login Failed! Please check your Pulse email and/or password or send an email to support@aptask.com');
        }

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

    logout() {
        this.setAuthInfo(null as any);
        this.setUser(null as any);
    }


    async addLeave(leave: Leave): Promise<any> {

        if (!this.#isAuthInfoSet()) return Promise.reject();

        return axios({
            url: ADD_LEAVE_URL,
            method: "POST",
            headers: this.#getAuthHeaders(),
            data: [{ userId: this.#authInfo!.userId, ...leave }]
        })
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