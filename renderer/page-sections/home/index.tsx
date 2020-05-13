import React from "react";

import OptionsCard from "../../components/card";
import { WorkIcon, LunchIcon, CoffeeIcon } from "../../components/icons";
import styles from "./home.module.scss";
import { WORK_TIMER, LUNCH_TIMER, COFFEE_TIMER } from "../../../constants";
import useTimer from "../../hooks/useTimerComponent";
import AppHeader from "../../components/header";
import { Space, Divider } from "antd";
import { HomeSectionFooter } from "../../components/footer";

export default function HomeSection() {
  const [WorkTimer, isWorkTimerActive] = useTimer(WORK_TIMER, "Worked Today");
  const [LunchTimer, isLunchTimerActive] = useTimer(LUNCH_TIMER, "Lunch Break");
  const [CoffeeTimer, isCoffeeTimerActive] = useTimer(
    COFFEE_TIMER,
    "Coffee Break"
  );
  return (
    <Space
      style={{
        display: "block",
        width: "100%",
      }}
      direction="vertical"
      size="large"
    >
      <AppHeader />
      {/* <Divider className={styles.dividerBackground} /> */}
      <div className={styles.optionsGrid}>
        <OptionsCard icon={WorkIcon} title="Work" invert={isWorkTimerActive}>
          {WorkTimer}
        </OptionsCard>
        <OptionsCard icon={LunchIcon} title="Lunch" invert={isLunchTimerActive}>
          {LunchTimer}
        </OptionsCard>
        <OptionsCard
          icon={CoffeeIcon}
          title="Coffee"
          invert={isCoffeeTimerActive}
        >
          {CoffeeTimer}
        </OptionsCard>
      </div>
      <HomeSectionFooter />
    </Space>
  );
}
