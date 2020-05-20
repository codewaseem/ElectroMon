import React from "react";
import { Typography, Switch } from "antd";
import styles from "./timer.module.scss";

const Timer = ({
  onStart = () => {},
  onStop = () => {},
  isActive = false,
  time = { hours: 0, minutes: 0, seconds: 0 },
  summaryText,
}) => {
  const handleChange = (checked) => {
    if (checked) onStart();
    else onStop();
  };

  return (
    <div className={styles.timerContainer}>
      <div className={styles.mainContent}>
        <Typography.Title level={1} className={styles.time}>
          <span className={styles.hours}>{time.hours}</span>
          <span className={styles.minutes}>
            <span className={isActive ? styles.blinker : ""}>:</span>
            {time.minutes}
          </span>
          <span className={styles.seconds}>
            <span className={isActive ? styles.blinker : ""}>:</span>
            {time.seconds}
          </span>
        </Typography.Title>
        {summaryText && <p className={styles.summaryText}>{summaryText}</p>}
      </div>
      <div className={styles.timerState}>
        <Switch onChange={handleChange} checked={isActive} />
        <span>{isActive ? "ON" : "OFF"}</span>
      </div>
    </div>
  );
};

export default Timer;
