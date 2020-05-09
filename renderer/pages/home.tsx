import React, { useContext, useState, useEffect } from "react";
import Layout from "../components/layout";
import OptionsCard from "../components/card";
import { WorkIcon } from "../components/icons";
import Timer from "../components/timer";
import styles from "../styles/home.module.scss";
import { DailyTimer } from "../context/timer/timer";
import { TimerContext } from "../context";

const Home = () => {
  const timer = useContext(TimerContext);

  const [currentTime, setCurrentTime] = useState(timer.getTodaysTimeObject());

  useEffect(() => {
    setTimeout(() => {
      setCurrentTime(timer.getTodaysTimeObject());
    });
  }, [currentTime]);

  return (
    <Layout>
      <div className={styles.optionsGrid}>
        <OptionsCard icon={WorkIcon} title="Hello">
          <Timer
            time={currentTime}
            summaryText="Worked Today"
            onStart={() => timer.start()}
            onStop={() => timer.stop()}
          />
        </OptionsCard>
        <OptionsCard icon={WorkIcon} title="Hello">
          <Timer summaryText="Worked Today" />
        </OptionsCard>
        <OptionsCard icon={WorkIcon} title="Hello">
          <Timer summaryText="Worked Today" />
        </OptionsCard>
      </div>
    </Layout>
  );
};

export default Home;
