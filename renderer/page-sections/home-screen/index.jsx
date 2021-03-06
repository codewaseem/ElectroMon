import React, { useState } from "react";
import styles from "./home.module.scss";
import AppHeader from "../../components/header";
import { Space, Spin } from "antd";
import { HomeSectionFooter } from "../../components/footer";
import { useTimerHandlerContext } from "../../context-providers/timerHandler";
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
  const { timersManager, stopAndPushTimerData } = useTimerHandlerContext();
  const closeWindow = useCloseWindow();
  const safelyExit = async () => {
    setSpinner({
      spinning: true,
      tip: "Stopping timers, saving data..",
    });

    await stopAndPushTimerData();

    saveTimerData(timersManager);

    setSpinner({
      spinning: true,
      tip: "Done..Closing",
    });

    closeWindow();
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
    </div>
  );
}
