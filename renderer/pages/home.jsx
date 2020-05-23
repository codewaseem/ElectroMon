import React from "react";
import Layout from "../components/layout";
import HomeScreen from "../page-sections/home-screen";
import UpdateScreen from "../page-sections/update-screen";
import { ExactRoute } from "../context/router";
import LoginForm from "../page-sections/login-screen";
import { ROUTES } from "../../constants/index";

const Home = () => {
  return (
    <Layout>
      <ExactRoute match={ROUTES.UPDATE}>
        <UpdateScreen />
      </ExactRoute>
      <ExactRoute match={ROUTES.HOME}>
        <HomeScreen />
      </ExactRoute>
      <ExactRoute match={ROUTES.LOGIN}>
        <LoginForm />
      </ExactRoute>
    </Layout>
  );
};

export default Home;
