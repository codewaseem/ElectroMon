import { useEffect, useState } from "react";
import { TIMERS_STORAGE_KEY } from "../../constants";

export default function useTimerData() {
    let [timersData, setTimersData] = useState();

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem(TIMERS_STORAGE_KEY));
        if (storedData) setTimersData(storedData);
    }, []);

    return timersData;
}