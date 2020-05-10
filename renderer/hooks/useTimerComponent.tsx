import React, { useEffect, useState, useContext } from "react";
import Timer from "../components/timer";
import { TimerContext } from "../context";

const useTimer = (timerName: string, summaryText: string) => {
  const timersManager = useContext(TimerContext);
  globalThis.timer = timersManager;
  timersManager.addNewTimer(timerName);
  const thisTimer = timersManager.getTimerByName(timerName);
  const [currentTime, setCurrentTime] = useState(thisTimer.totalTimeObject);

  useEffect(() => {
    setTimeout(() => {
      setCurrentTime(thisTimer.totalTimeObject);
    });
  }, [currentTime]);

  return (
    <Timer
      isActive={thisTimer.isRunning}
      time={thisTimer.totalTimeObject}
      summaryText={summaryText}
      onStart={() => timersManager.startTimer(timerName)}
      onStop={() => timersManager.stopTimer()}
    />
  );
};

export default useTimer;
