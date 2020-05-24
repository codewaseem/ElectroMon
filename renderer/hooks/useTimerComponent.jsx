import React, { useEffect, useState } from "react";
import Timer from "../components/timer";
import { useTimerHandlerContext } from "../context-providers/timerHandler";

const useTimer = (timerName, summaryText) => {
  const { timersManager } = useTimerHandlerContext();
  timersManager.addNewTimer(timerName);
  const thisTimer = timersManager.getTimerByName(timerName);
  const [, setCurrentTime] = useState(thisTimer.totalTimeObject);

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
      key={timerName}
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
