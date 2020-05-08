import React from "react";
import Layout from "../components/layout";
import OptionsCard from "../components/card";

const Timer = () => {};

const Home = () => {
  return (
    <Layout>
      <div style={{ padding: 50 }}>
        <OptionsCard icon={() => <div>h1</div>} title="Hello" />
      </div>
    </Layout>
  );
};

export default Home;
