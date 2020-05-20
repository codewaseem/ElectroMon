import React from "react";
import styles from "./logo.module.scss";
import logo from "../../assets/ap-task-logo.png";

export default function Logo() {
  return (
    <span className={styles.logo}>
      <img src={logo} alt="" />
      <span>
        <span className={styles.ai}>Ai</span>
        <span className={styles.monitor}>Monitor</span>
      </span>
    </span>
  );
}
