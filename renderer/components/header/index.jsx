import { PageHeader, Avatar } from "antd";
import styles from "./header.module.scss";
import React from "react";
import Logo from "../logo";
import TimeInfo from "./TimeInfo";
import { AUTH_DATA_KEY } from "../../../constants";

export default function AppHeader() {
  const userInfo = JSON.parse(localStorage.getItem(AUTH_DATA_KEY)).userInfo;
  const extras = [];

  if (userInfo && userInfo.picture) {
    extras.push(<Avatar size="large" src={userInfo.picture} />);
  }

  return (
    <div>
      <PageHeader
        className={styles.headerOveride}
        title={<Logo />}
        extra={extras}
      >
        <TimeInfo />
      </PageHeader>
    </div>
  );
}
