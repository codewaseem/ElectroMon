import { app, ipcMain } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import AutoUpdater, { sendUpdateEventsToWindow } from "./helpers/auto-updater";
import { UPDATER_EVENTS, EMIT_CHECK_FOR_UPDATES } from "../constants";

export const isProd = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

let mainWindow;

(async () => {
  await app.whenReady();

  mainWindow = createWindow("main", {
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
})();

app.on("window-all-closed", () => {
  app.quit();
});

ipcMain.on(EMIT_CHECK_FOR_UPDATES, () => {
  console.log("called");

  let autoUpdater = AutoUpdater.start(sendUpdateEventsToWindow(mainWindow));

  if (!isProd) {
    autoUpdater.emit(UPDATER_EVENTS.UPDATE_NOT_AVAILABLE);
  }

  autoUpdater.on(UPDATER_EVENTS.UPDATE_DOWNLOADED, () => {
    autoUpdater.quitAndInstall(true, true);
  });
});

export const appVersion = app.getVersion();
