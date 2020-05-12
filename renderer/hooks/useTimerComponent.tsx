import React, { useEffect, useState, useContext } from "react";
import Timer from "../components/timer";
import { TimerContext } from "../context";

const useTimer = (
  timerName: string,
  summaryText: string
): [JSX.Element, boolean] => {
  const timersManager = useContext(TimerContext);
  timersManager.addNewTimer(timerName);
  const thisTimer = timersManager.getTimerByName(timerName);
  const [currentTime, setCurrentTime] = useState(thisTimer.totalTimeObject);

  useEffect(() => {
    let id = setTimeout(() => {
      setCurrentTime(thisTimer.totalTimeObject);
    }, 1000);

    return () => clearTimeout(id);
  }, [currentTime]);

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
