const { remote, ipcRenderer, desktopCapturer } = eval(`require('electron')`);

let mainModule = null;
let trackerModule = null;

if (remote) {
  mainModule = remote.require("./main");
  trackerModule = remote.require("./tracker");
}

export function getIpcRenderer() {
  return ipcRenderer;
}

export function startTracking() {
  console.log(trackerModule);
  if (trackerModule) {
    trackerModule.startTracking();
    desktopCapturer
      .getSources({
        types: ["screen", "window"],
        thumbnailSize: {
          width: 0,
          height: 0,
        },
      })
      .then((sources) => {
        console.log("desktopCapturer:");
        console.log(JSON.stringify(sources, null, 2));
      });
  }
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
