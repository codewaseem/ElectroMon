import React, { useEffect, useState, useContext } from "react";
import Timer from "../components/timer";
import { TimerContext } from "../context";

const useTimer = (timerName, summaryText) => {
  const timersManager = useContext(TimerContext);
  timersManager.addNewTimer(timerName);
  const thisTimer = timersManager.getTimerByName(timerName);
  const [_, setCurrentTime] = useState(thisTimer.totalTimeObject);

  useEffect(() => {
    let id = setInterval(() => {
      setCurrentTime(thisTimer.totalTimeObject);
    }, 300);

    return () => {
      console.log("clearing timer", id);
      clearTimeout(id);
    };
  }, []);

  return [
    <Timer
      isActive={thisTimer.isRunning}
      time={thisTimer.totalTimeObject}
      summaryText={summaryText}
      onStart={() => timersManager.startTimer(timerName)}
      onStop={() => timersManager.stopTimer()}
    />,
    thisTimer.isRunning,
  ];
};

export default useTimer;
