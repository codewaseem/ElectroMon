const { remote, ipcRenderer } = eval(`require('electron')`);

let mainModule = null;

if (remote) {
  mainModule = remote.require("./main");
}

export function getIpcRenderer() {
  return ipcRenderer;
}

export function isDev() {
  return !mainModule.isProd;
}

export function useCloseWindow() {
  if (remote) {
    let window = remote.getCurrentWindow();
    return () => window.close();
  }
}
