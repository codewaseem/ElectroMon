import React, { useState } from "react";
import Layout from "../components/layout";
import HomeSection from "../page-sections/home";
import LoginForm from "../page-sections/login";
import CheckForUpdates from "../page-sections/check-update";

const AppStates = {
  Login: "Login",
  Updates: "Updates",
  Home: "Home",
};

const defaultState = AppStates.Login;

const Home = () => {
  const [state, setState] = useState(defaultState);

  const onLoginComplete = () => setState(AppStates.Updates);

  const onUpdateComplete = () => setState(AppStates.Home);

  return (
    <Layout>
      {state == AppStates.Login && <LoginForm onComplete={onLoginComplete} />}
      {state == AppStates.Updates && (
        <CheckForUpdates onComplete={onUpdateComplete} />
      )}
      {state == AppStates.Home && <HomeSection />}
    </Layout>
  );
};

export default Home;
