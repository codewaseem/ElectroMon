import React from "react";
import Layout from "../components/layout";
import HomeSection from "../page-sections/home";
import LoginForm from "../page-sections/login";

const Home = () => {
  return (
    <Layout>
      <LoginForm />
      {/* <HomeSection /> */}
    </Layout>
  );
};

export default Home;
