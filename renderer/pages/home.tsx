import React from "react";
import Layout from "../components/layout";
import OptionsCard from "../components/card";
import { WorkIcon } from "../components/icons";
import Timer from "../components/timer";

const Home = () => {
  return (
    <Layout>
      <div style={{ padding: 50 }}>
        <OptionsCard icon={WorkIcon} title="Hello">
          <Timer summaryText="Worked Today" />
        </OptionsCard>
      </div>
    </Layout>
  );
};

export default Home;
