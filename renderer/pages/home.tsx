import React from "react";
import Layout from "../components/layout";
import OptionsCard from "../components/card";
import { WorkIcon, LunchIcon, CoffeeIcon } from "../components/icons";
import styles from "../styles/home.module.scss";
import { WORK_TIMER, LUNCH_TIMER, COFFEE_TIMER } from "../../constants";
import useTimer from "../hooks/useTimerComponent";
import AppHeader from "../components/header";
import { Space } from "antd";

const Home = () => {
  const [WorkTimer, isWorkTimerActive] = useTimer(WORK_TIMER, "Worked Today");
  const [LunchTimer, isLunchTimerActive] = useTimer(LUNCH_TIMER, "Lunch Break");
  const [CoffeeTimer, isCoffeeTimerActive] = useTimer(
    COFFEE_TIMER,
    "Coffee Break"
  );

  return (
    <Layout>
      <Space
        style={{
          display: "block",
          width: "100%",
        }}
        direction="vertical"
        size="large"
      >
        <AppHeader />
        <div className={styles.optionsGrid}>
          <OptionsCard icon={WorkIcon} title="Work" invert={isWorkTimerActive}>
            {WorkTimer}
          </OptionsCard>
          <OptionsCard
            icon={LunchIcon}
            title="Lunch"
            invert={isLunchTimerActive}
          >
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
      </Space>
    </Layout>
  );
};

export default Home;
