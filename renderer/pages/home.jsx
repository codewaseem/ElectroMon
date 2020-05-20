import React, { useState } from "react";
import Layout from "../components/layout";
import HomeSection from "../page-sections/home";
import PreCheckScreen from "../page-sections/precheck-screen";

const AppStates = {
  Updates: "Updates",
  Home: "Home",
};

const defaultState = AppStates.Updates;

const Home = () => {
  const [state, setState] = useState(defaultState);

  const onPreCheckComplete = () => setState(AppStates.Home);

  return (
    <Layout>
      {state == AppStates.Updates && (
        <PreCheckScreen onComplete={onPreCheckComplete} />
      )}
      {/* TODO: merge below to Components */}
      {state == AppStates.Home && <HomeSection />}
    </Layout>
  );
};

export default Home;
