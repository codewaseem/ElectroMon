import { app } from 'electron';
import serve from 'electron-serve';
import { createWindow } from './helpers';

const isProd: boolean = process.env.NODE_ENV === 'production';


import ElectronAuth0Login from 'electron-auth0-login-keytar';

export const auth = new ElectronAuth0Login({
  auth0Audience: 'https://aptask-pulse-dev.auth0.com/api/v2/',
  auth0ClientId: 'jaNKRYV53HzXVAk3enAeai8wHyVCK43o',
  auth0Domain: 'aptask-pulse-dev.auth0.com',
  auth0Scopes: 'openid profile email user_metadata app_metadata offline_access', // add 'offline_access'
  applicationName: 'ai-monitor', // add an application name
  redirectEndpoint: '/auth'
});

/*
  Add this to above config, once the redirectEndpoint is added by krishna
  auth0Audience: 'https://aptask-pulse-dev.auth0.com/api/v2/',
  auth0ClientId: '6Lr8ZLw4GFlH7zpOda0d4EZCTlZ5La1A',
  auth0Domain: 'aptask-pulse-dev.auth0.com',
  auth0Scopes: 'openid profile email user_metadata app_metadata offline_access', // add 'offline_access'
  applicationName: 'ai-monitor', // add an application name
  redirectEndpoint: '/auth'

*/

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
