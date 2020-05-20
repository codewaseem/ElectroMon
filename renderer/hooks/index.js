import { useContext } from "react";
import { AiMonitorContext, TimerContext } from "../context";

export function useAiMonitorAPI() {
    const aiMonitorAPI = useContext(AiMonitorContext);
    return aiMonitorAPI;
}

export function useTimerManagerContext() {
    const timerManager = useContext(TimerContext);
    return timerManager;
}