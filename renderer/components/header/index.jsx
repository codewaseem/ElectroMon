import React from "react";
import { PageHeader, Avatar } from "antd";
import styles from "./header.module.scss";
import Logo from "../logo";
import TimeInfo from "./TimeInfo";
import { aiMonitorApi } from "ai-monitor-core";

export default function AppHeader() {
  const extras = [];
  // const logout = useLogout();

  extras.push(
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
      key="avatar"
    >
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
