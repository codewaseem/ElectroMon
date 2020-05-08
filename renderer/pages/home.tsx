import React from "react";
import Layout from "../components/layout";
import OptionsCard from "../components/card";
import { WorkIcon } from "../components/icons";

const Timer = () => {};

const Home = () => {
  return (
    <Layout>
      <div style={{ padding: 50 }}>
        <OptionsCard icon={WorkIcon} title="Hello" />
      </div>
    </Layout>
  );
};

export default Home;
