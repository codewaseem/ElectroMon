import { MONITOR_API_URL } from "../../constants";

// export interface User {
//     id: number | string,
//     access_token: string,
//     name: string,
//     email: string
// }

// export interface LeaveData {
//     reason: string,
//     startTime: number,
//     endTime: number,
// }

// export interface LogData {
//     logType: string,
//     notes?: string,
//     startTime: number,
//     endTime: number
// }

// export interface AiMonitorAPIInterface {
//     canAddManualTime(): Promise<boolean>;
//     login(email: string, password: string): Promise<User>;
//     verifyLogin(token: string): Promise<User>;
//     addLeave(data: LeaveData): Promise<any>;
//     pushLogHistory(history: LogHistory[]): Promise<any>;
//     addManualTime(timeData: LogHistory): Promise<any>;
// }

export class TestAiMonitorAPI {
  addLeave(data) {
    return fetch(`${MONITOR_API_URL}/leaves`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  async canAddManualTime() {
    return new Promise((resolve, reject) => {
      // let canAdd = Math.random() >= 0.5
      setTimeout(() => resolve(true), 2000);
    });
  }

  addManualTime(data) {
    return this.pushLogHistory([{ ...data, manual: true }]);
  }

  pushLogHistory(history) {
    return fetch(`${MONITOR_API_URL}/logs`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(history),
    })
      .then((data) => {
        console.log("history pushed, deleting current history");
        return data;
      })
      .catch((err) => {
        console.log("failed to sync history with server");
        console.error(err);
        // TODO: Report error.
        throw err;
      });
  }
}
