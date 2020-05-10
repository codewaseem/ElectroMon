import React from "react";
import Layout from "../components/layout";
import OptionsCard from "../components/card";
import { WorkIcon, LunchIcon, CoffeeIcon } from "../components/icons";
import styles from "../styles/home.module.scss";
import { ALL_TIMERS } from "../../constants";
import useTimer from "../hooks/useTimer";

const Home = () => {
  const WorkTimer = useTimer(ALL_TIMERS.WORK_TIMER, "Worked Today");
  const LunchTimer = useTimer(ALL_TIMERS.LUNCH_TIMER, "Lunch Break");
  const CoffeeTimer = useTimer(ALL_TIMERS.COFFEE_TIMER, "Coffee Break");

  return (
    <Layout>
      <div className={styles.optionsGrid}>
        <OptionsCard icon={WorkIcon} title="Work">
          {WorkTimer}
        </OptionsCard>
        <OptionsCard icon={LunchIcon} title="Lunch">
          {LunchTimer}
        </OptionsCard>
        <OptionsCard icon={CoffeeIcon} title="Coffee">
          {CoffeeTimer}
        </OptionsCard>
      </div>
    </Layout>
  );
};

export default Home;
