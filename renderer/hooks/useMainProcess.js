import { useState, useEffect } from "react";
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

export function useAuthLogin() {
  return () => authModule.getToken();
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
