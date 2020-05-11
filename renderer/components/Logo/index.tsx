import React from "react";
import styles from "./logo.module.scss";

export default function Logo() {
  return (
    <span className={styles.logo}>
      <span className={styles.ai}>Ai</span>
      <span className={styles.monitor}>Monitor</span>
    </span>
  );
}
