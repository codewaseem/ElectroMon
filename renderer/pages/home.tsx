import React from "react";
import Layout from "../components/layout";
import OptionsCard from "../components/card";
import { WorkIcon, LunchIcon, CoffeeIcon } from "../components/icons";
import styles from "../styles/home.module.scss";
import { WORK_TIMER, LUNCH_TIMER, COFFEE_TIMER } from "../../constants";
import useTimer from "../hooks/useTimerComponent";

const Home = () => {
  const WorkTimer = useTimer(WORK_TIMER, "Worked Today");
  const LunchTimer = useTimer(LUNCH_TIMER, "Lunch Break");
  const CoffeeTimer = useTimer(COFFEE_TIMER, "Coffee Break");

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
