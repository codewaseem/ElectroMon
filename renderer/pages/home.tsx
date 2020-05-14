import React, { useState } from "react";
import Layout from "../components/layout";
import HomeSection from "../page-sections/home";
import LoginForm from "../page-sections/login";
import CheckForUpdates from "../page-sections/check-update";
import { AppFooter } from "../components/footer";

const AppStates = {
  Login: "Login",
  Updates: "Updates",
  Home: "Home",
};

const defaultState = AppStates.Updates;

const Home = () => {
  const [state, setState] = useState(defaultState);

  const onLoginComplete = () => setState(AppStates.Home);

  const onUpdateComplete = () => setState(AppStates.Login);

  return (
    <Layout>
      {state == AppStates.Login && <LoginForm onComplete={onLoginComplete} />}
      {state == AppStates.Updates && (
        <CheckForUpdates onComplete={onUpdateComplete} />
      )}
      {state == AppStates.Home && <HomeSection />}

      {state == AppStates.Home && <AppFooter />}
    </Layout>
  );
};

export default Home;
