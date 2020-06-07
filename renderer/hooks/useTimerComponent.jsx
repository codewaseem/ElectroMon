import React, { useEffect, useState } from "react";
import Timer from "../components/timer";
import { useTimerHandlerContext } from "../context-providers/timerHandler";
import { getIpcRenderer } from "./useMainProcess";
import { IPC_CHANNELS, WORK_TIMER } from "../../constants";

const ipcRenderer = getIpcRenderer();

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
      onStart={() => {
        if (timerName == WORK_TIMER)
          ipcRenderer.send(IPC_CHANNELS.START_TRACKING, timerName);
        else ipcRenderer.send(IPC_CHANNELS.STOP_TRACKING);

        timersManager.startTimer(timerName);
      }}
      onStop={() => {
        ipcRenderer.send(IPC_CHANNELS.STOP_TRACKING);
        timersManager.stopTimer();
      }}
    />,
    thisTimer.isRunning,
  ];
};

export default useTimer;
