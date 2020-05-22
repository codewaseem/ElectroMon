import { PageHeader, Avatar, Button } from "antd";
import styles from "./header.module.scss";
import React from "react";
import Logo from "../logo";
import TimeInfo from "./TimeInfo";
import { AUTH_DATA_KEY } from "../../../constants";
import { useLogout } from "../../hooks/useMainProcess";

export default function AppHeader() {
  const userInfo = JSON.parse(localStorage.getItem(AUTH_DATA_KEY)).userInfo;
  const extras = [];
  const logout = useLogout();

  async function handleLogoutClick() {
    await logout();
    console.log("logout done!");
  }

  if (userInfo && userInfo.picture) {
    extras.push(
      <div key="avatar">
        <Button
          style={{
            marginRight: 10,
          }}
          size="small"
          danger
          htmlType="button"
          onClick={handleLogoutClick}
        >
          Log out
        </Button>
        <Avatar size="large" src={userInfo.picture} />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        className={styles.headerOveride}
        title={<Logo />}
        extra={extras.length ? extras : undefined}
      >
        <TimeInfo />
      </PageHeader>
    </div>
  );
}
