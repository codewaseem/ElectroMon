import React from "react";
import Layout from "../components/layout";
import OptionsCard from "../components/card";
import { WorkIcon } from "../components/icons";
import Timer from "../components/timer";
import styles from "../styles/home.module.scss";
import { DailyTimer } from "../context/timer/timer";

const Home = () => {
  globalThis.timer = new DailyTimer();
  return (
    <Layout>
      <div className={styles.optionsGrid}>
        <OptionsCard icon={WorkIcon} title="Hello">
          <Timer summaryText="Worked Today" />
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
