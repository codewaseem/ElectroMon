import { app } from 'electron';
import serve from 'electron-serve';
import { createWindow } from './helpers';

const isProd: boolean = process.env.NODE_ENV === 'production';


import ElectronAuth0Login from 'electron-auth0-login';

export const auth = new ElectronAuth0Login({
  auth0Audience: 'https://dev-18rd1ag0.auth0.com/api/v2/',
  auth0ClientId: 'nu8cw2jv4NIGdImgIfxu1qGsPEVWF8Sw',
  auth0Domain: 'dev-18rd1ag0.auth0.com',
  auth0Scopes: 'given_name profile offline_access', // add 'offline_access'
  applicationName: 'my-cool-app', // add an application name
  useRefreshTokens: true // add useRefreshTokens: true
});


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
})();

app.on('window-all-closed', () => {
  app.quit();
});
