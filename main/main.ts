import { app } from 'electron';
import serve from 'electron-serve';
import { createWindow } from './helpers';
import AutoUpdater, { sendUpdateEventsToWindow } from './helpers/auto-updater';
import { UPDATER_EVENTS } from '../constants';

const isProd: boolean = process.env.NODE_ENV === 'production';

if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow('main', {
    height: 480,
    width: 740,
    minWidth: 740,
    maxWidth: 840,
    minHeight: 480,
    maxHeight: 550,
    title: 'ApTask AiMonitor',
    autoHideMenuBar: isProd ? true : false
  });

  if (isProd) {
    await mainWindow.loadURL('app://./home.html');
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }

  console.log("Calling updater");
  AutoUpdater.start();

})();


app.on('window-all-closed', () => {
  app.quit();
});

export const appVersion = app.getVersion();