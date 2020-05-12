import React from "react";
import { Layout as AppLayout, Menu, Breadcrumb } from "antd";
import styles from "./style.module.scss";

const { Header, Content, Footer } = AppLayout;

export default function Layout({ children }) {
  return (
    <AppLayout className={styles.layout}>
      {/* <Header className={styles.header}></Header> */}
      <Content style={{ padding: "25px 30px" }}>{children}</Content>
      {/* <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer> */}
    </AppLayout>
  );
}
