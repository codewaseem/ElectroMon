import React, { useState } from "react";
import Layout from "../components/layout";
import HomeSection from "../page-sections/home";
import PreCheckScreen from "../page-sections/precheck-screen";
import { AppFooter } from "../components/footer";

const AppStates = {
  // Login: "Login",
  Updates: "Updates",
  Home: "Home",
};

const defaultState = AppStates.Updates;

const Home = () => {
  const [state, setState] = useState(defaultState);

  // const onLoginComplete = () => setState(AppStates.Home);

  const onPreCheckComplete = () => setState(AppStates.Home);

  return (
    <Layout>
      {/* {state == AppStates.Login && <LoginForm onComplete={onLoginComplete} />} */}
      {state == AppStates.Updates && (
        <PreCheckScreen onComplete={onPreCheckComplete} />
      )}
      {/* TODO: merge below to Components */}
      {state == AppStates.Home && <HomeSection />}
      {state == AppStates.Home && <AppFooter />}
    </Layout>
  );
};

export default Home;
