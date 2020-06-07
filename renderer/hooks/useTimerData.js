import { useEffect, useState } from "react";
import { TIMERS_STORAGE_KEY, TIMERS_HISTORY_KEY } from "../../constants";

export default function useTimerData() {
  let [timersData, setTimersData] = useState([undefined, undefined]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem(TIMERS_STORAGE_KEY));
    const historyData = JSON.parse(localStorage.getItem(TIMERS_HISTORY_KEY));
    setTimersData([storedData, historyData]);
  }, []);

  return timersData;
}
