import {
  MONITOR_API_URL,
  AUTH_DATA_KEY,
  APTASK_BASE_URL,
} from "../../constants";

export class AiMonitorAPI {
  fetchUserDetails(token, subAuthId) {
    let options = this._getAuthOptions(token);

    return fetch(`${APTASK_BASE_URL}/api/v1/users/me/${subAuthId}`, options)
      .then((r) => r.json())
      .then((res) => res.data)
      .catch(console.log);
  }

  _getAuthOptions(token) {
    let options = {};
    options.headers = {};
    options.headers["Authorization"] =
      "Bearer " + token ||
      JSON.parse(localStorage.getItem(AUTH_DATA_KEY)).token;
    options.headers["Accept"] = "application/json, text/plain, */*";
    options.headers["Content-Type"] = "application/json;charset=utf-8";
    return options;
  }

  _getUserId() {
    return JSON.parse(localStorage.getItem(AUTH_DATA_KEY)).userInfo.id;
  }

  addLeave(data) {
    let userId = this._getUserId();
    let options = this._getAuthOptions();
    return fetch(`${MONITOR_API_URL}/leaves`, {
      ...options,
      method: "POST",
      body: JSON.stringify([{ ...data, userId }]),
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  async canAddManualTime() {
    return new Promise((resolve) => {
      // let canAdd = Math.random() >= 0.5
      setTimeout(() => resolve(true), 2000);
    });
  }

  addManualTime(data) {
    return this.pushLogHistory([{ ...data, manual: true }]);
  }

  pushLogHistory(history) {
    let userId = this._getUserId();
    let options = this._getAuthOptions();
    history.forEach((log) => (log.userId = userId));

    return fetch(`${MONITOR_API_URL}/logs`, {
      ...options,
      method: "POST",
      body: JSON.stringify(history),
    })
      .then((data) => {
        console.log("history pushed, deleting current history");
        return data.json();
      })
      .catch((err) => {
        console.log("failed to sync history with server");
        console.error(err);
        // TODO: Report error.
        throw err;
      });
  }
}
