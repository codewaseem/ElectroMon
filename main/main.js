import { app } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import AutoUpdater, { sendUpdateEventsToWindow } from "./helpers/auto-updater";
import { UPDATER_EVENTS } from "../constants";

export const isProd = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow("main", {
    height: 540,
    width: 800,
    minWidth: 800,
    maxWidth: 900,
    minHeight: 540,
    maxHeight: 600,
    title: "ApTask AiMonitor",
    autoHideMenuBar: isProd ? true : false,
    
  });

  if (isProd) {
    await mainWindow.loadURL("app://./home.html");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }

  let autoUpdater = AutoUpdater.start(sendUpdateEventsToWindow(mainWindow));
  autoUpdater.on(UPDATER_EVENTS.UPDATE_DOWNLOADED, () => {
    autoUpdater.quitAndInstall(true, true);
  });
  if (!isProd) {
    autoUpdater.emit(UPDATER_EVENTS.UPDATE_NOT_AVAILABLE);
  }
})();

app.on("window-all-closed", () => {
  app.quit();
});

export const appVersion = app.getVersion();
