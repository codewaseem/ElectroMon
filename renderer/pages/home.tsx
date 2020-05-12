import React from "react";
import Layout from "../components/layout";
import HomeSection from "../page-sections/home";
import LoginForm from "../page-sections/login";
import CheckForUpdates from "../page-sections/check-update";

const Home = () => {
  return (
    <Layout>
      <CheckForUpdates />
      {/* <LoginForm /> */}
      {/* <HomeSection /> */}
    </Layout>
  );
};

export default Home;
