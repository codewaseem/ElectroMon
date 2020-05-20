import React, { useState } from "react";
import styles from "./home.module.scss";
import AppHeader from "../../components/header";
import { Space, Spin } from "antd";
import { HomeSectionFooter, AppFooter } from "../../components/footer";
import { useTimerManagerContext } from "../../hooks";
import { saveTimerData } from "../../hooks/useTimerManager";
import WorkTimer from "./WorkTimer";
import LunchTimer from "./LunchTimer";
import CoffeeTimer from "./CoffeeTimer";

const electron = eval("require('electron')");

export default function HomeSection() {
  const [spinner, setSpinner] = useState({
    spinning: false,
    tip: "",
  });
  const timersManager = useTimerManagerContext();

  console.log("updated");

  const safelyExit = () => {
    const remote = electron.remote || false;
    if (remote) {
      setSpinner({
        spinning: true,
        tip: "Stopping timers, saving data..",
      });
      timersManager.stopTimer();
      saveTimerData(timersManager);
      setTimeout(() => {
        let window = remote.getCurrentWindow();
        window.close();
      }, 1000 * 5);
    }
  };

  return (
    <div>
      <Space
        style={{
          display: "block",
          width: "100%",
        }}
        direction="vertical"
        size="large"
      >
        <Spin spinning={spinner.spinning} tip={spinner.tip}>
          <AppHeader />
          {/* <Divider className={styles.dividerBackground} /> */}
          <div className={styles.optionsGrid}>
            <WorkTimer />
            <LunchTimer />
            <CoffeeTimer />
          </div>
          <HomeSectionFooter onExitClick={safelyExit} />
        </Spin>
      </Space>
      <AppFooter />
    </div>
  );
}
