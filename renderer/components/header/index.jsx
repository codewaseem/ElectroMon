import { PageHeader, Avatar, Button } from "antd";
import styles from "./header.module.scss";
import React from "react";
import Logo from "../logo";
import TimeInfo from "./TimeInfo";
import { useRouterContext } from "../../context/router";
import { ROUTES } from "../../../constants";
// import { AUTH_DATA_KEY } from "../../../constants";
// import { useLogout } from "../../hooks/useMainProcess";

export default function AppHeader() {
  const { setPath } = useRouterContext();

  const extras = [];
  // const logout = useLogout();

  async function handleLogoutClick() {
    // await logout();
    setPath(ROUTES.LOGIN);
    console.log("logout done!");
  }

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
      <Avatar size="large" />
    </div>
  );

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
