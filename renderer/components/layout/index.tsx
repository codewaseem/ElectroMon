import React from "react";
import styles from "./style.module.scss";
import { Switch } from "antd";

console.log(styles);

export default function Layout() {
  return (
    <div className={styles.container}>
      <Switch />
    </div>
  );
}
