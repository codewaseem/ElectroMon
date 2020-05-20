import { useState, useEffect } from "react";

const electron = eval("require('electron');");
const remote = electron.remote || false;
let auth = null;

if (remote) {
    auth = remote.require("./auth").default;
}

export function useAuthData() {
    const [authData, setAuthData] = useState({
        token: null,
        user: null
    });

    useEffect(() => {
        const getData = async () => {
            try {
                let token = await auth.getToken();
                let user = await auth.getUserInfo(token);
                setAuthData({
                    token,
                    user
                });
            } catch (e) {
                console.log(e);
            }
        }
        getData();
    }, []);

    return authData;
}

export default function useAuth() {
    return auth;
}