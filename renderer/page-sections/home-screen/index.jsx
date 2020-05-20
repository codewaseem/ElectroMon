import React, { useState } from "react";
import styles from "./home.module.scss";
import AppHeader from "../../components/header";
import { Space, Spin } from "antd";
import { HomeSectionFooter, AppFooter } from "../../components/footer";
import { useTimerManagerContext } from "../../hooks";
import { useCloseWindow } from "../../hooks/useMainProcess";
import { saveTimerData } from "../../hooks/useTimerManager";
import WorkTimer from "./WorkTimer";
import LunchTimer from "./LunchTimer";
import CoffeeTimer from "./CoffeeTimer";

export default function HomeScreen() {
  const [spinner, setSpinner] = useState({
    spinning: false,
    tip: "",
  });
  const timersManager = useTimerManagerContext();
  const closeWindow = useCloseWindow();

  const safelyExit = () => {
    setSpinner({
      spinning: true,
      tip: "Stopping timers, saving data..",
    });
    timersManager.stopTimer();
    saveTimerData(timersManager);
    setTimeout(() => {
      closeWindow();
    }, 1000 * 5);
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
