import ElectronAuth0Login from "electron-auth0";
import config from "../constants/config.json";

const auth = new ElectronAuth0Login({
  auth0Audience: config.AUTH0_AUDIENCE,
  auth0ClientId: config.AUTH0_CLIENT_ID,
  auth0Domain: config.AUTH0_DOMAIN,
  auth0Scopes: config.AUTH0_SCOPES, // add 'offline_access'
});

export default auth;
