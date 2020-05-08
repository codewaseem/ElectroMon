import React from "react";
import styles from "./style.module.css";
import { Switch } from "antd";

export default function Layout() {
  return (
    <div className={styles.container}>
      <Switch />
    </div>
  );
}
