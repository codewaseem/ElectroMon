import React from "react";
import { Layout as AppLayout } from "antd";
import styles from "./style.module.scss";
import { AppFooter } from "../footer";

const { Content, Footer } = AppLayout;

export default function Layout({ children }) {
  return (
    <AppLayout className={styles.layout}>
      {/* <Header className={styles.header}></Header> */}
      <Content className={styles.content}>{children}</Content>
      <Footer className={styles.footer}>
        <AppFooter />
      </Footer>
    </AppLayout>
  );
}
