import React from "react";
import { Typography, Switch } from "antd";
import styles from "./timer.module.scss";

const zeroPad = (number: number) => (number <= 9 ? `0${number}` : number);

const Timer: React.FC<{
  onStart?: () => void;
  onStop?: () => void;
  isActive?: boolean;
  time?: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  summaryText?: string;
}> = ({
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
          <span className={styles.hours}>{zeroPad(time.hours)}</span>
          <span className={styles.minutes}>:{zeroPad(time.minutes)}</span>
          <span className={styles.seconds}>:{zeroPad(time.seconds)}</span>
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
