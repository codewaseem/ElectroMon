import { PageHeader, Avatar } from "antd";
import styles from "./header.module.scss";
import React from "react";
import Logo from "../logo";
import { useAuthData } from "../../hooks/useMainProcess";
import TimeInfo from "./TimeInfo";

export default function AppHeader() {
  const authData = useAuthData();
  console.log(authData);

  const extras = [];

  if (authData && authData.user) {
    extras.push(<Avatar size="large" src={authData.user.picture} />);
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
