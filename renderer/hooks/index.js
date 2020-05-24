import { useContext } from "react";
import { TimerContext } from "../context";

export function useTimerManagerContext() {
  const timerManager = useContext(TimerContext);
  return timerManager;
}
