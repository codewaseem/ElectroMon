import { useState, useEffect } from "react";
import { useAiMonitorAPI } from "./index";
import { AUTH_DATA_KEY } from "../../constants";

const { remote, ipcRenderer } = eval(`require('electron')`);

let mainModule = null;
let authModule = null;

if (remote) {
  mainModule = remote.require("./main");
  authModule = remote.require("./auth").default;
}

export function getAppVersion() {
  if (mainModule) {
    return mainModule.appVersion;
  }
  return null;
}

export function getIpcRenderer() {
  return ipcRenderer;
}

export function useAuthData() {
  const [authData, setAuthData] = useState({
    token: null,
    user: null,
  });

  useEffect(() => {
    const getData = async () => {
      try {
        let token = await authModule.getToken();
        let user = await authModule.getUserInfo(token);
        setAuthData({
          token,
          user,
        });
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  return authData;
}

export function useAuth0Login() {
  const api = useAiMonitorAPI();

  return async () => {
    let token = await authModule.getToken();
    let authUserData = await authModule.getUserInfo(token);
    let userInfo = await api.fetchUserDetails(token, authUserData.sub);

    localStorage.setItem(
      AUTH_DATA_KEY,
      JSON.stringify({ token, authUserData, userInfo })
    );

    return {
      token,
      authUserData,
    };
  };
}

export function getLogoutFunction() {
  return () => authModule.logout();
}

export function isDev() {
  return !mainModule.isProd;
}

export function useCloseWindow() {
  let window = remote.getCurrentWindow();
  return () => window.close();
}
