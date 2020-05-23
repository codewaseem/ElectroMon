import React from "react";
import Layout from "../components/layout";
import HomeScreen from "../page-sections/home-screen";
import PreCheckScreen from "../page-sections/precheck-screen";
import { ExactRoute } from "../context/router";
import LoginForm from "../page-sections/login-screen";

const Home = () => {
  return (
    <Layout>
      <ExactRoute match="/precheck">
        <PreCheckScreen />
      </ExactRoute>
      <ExactRoute match="/home">
        <HomeScreen />
      </ExactRoute>
      <ExactRoute match="/login">
        <LoginForm />
      </ExactRoute>
    </Layout>
  );
};

export default Home;
