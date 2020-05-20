import ElectronAuth0Login from 'electron-auth0-login-keytar';
import config from "./config.json";

const auth = new ElectronAuth0Login({
    auth0Audience: config.AUTH0_AUDIENCE,
    auth0ClientId: config.AUTH0_CLIENT_ID,
    auth0Domain: config.AUTH0_DOMAIN,
    auth0Scopes: 'openid profile email user_metadata app_metadata offline_access', // add 'offline_access'
    applicationName: 'ai-monitor', // add an application name for keytar
    redirectEndpoint: config.REDIRECT_ENDPOINT
});

export default auth;