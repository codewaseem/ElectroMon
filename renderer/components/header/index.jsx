import { PageHeader, Avatar, Button } from "antd";
import styles from "./header.module.scss";
import React from "react";
import Logo from "../logo";
import TimeInfo from "./TimeInfo";
import { useRouterContext } from "../../context/router";
import { ROUTES } from "../../../constants";
import { aiMonitorApi } from "ai-monitor-core";

export default function AppHeader() {
  const { setPath } = useRouterContext();

  const extras = [];
  // const logout = useLogout();

  async function handleLogoutClick() {
    // await logout();
    aiMonitorApi.logout();
    setPath(ROUTES.LOGIN);
  }

  extras.push(
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
      key="avatar"
    >
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
      <Avatar size="large" src={aiMonitorApi.getUser().picture} />
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
