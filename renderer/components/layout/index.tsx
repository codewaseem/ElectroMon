import React from "react";
import styles from "./style.module.css";
import { Switch } from "antd";

console.log(styles);

export default function Layout() {
  return (
    <div className={"container"}>
      {/* <div className={styles.container}> */}
      <Switch />
    </div>
  );
}
