import { useContext } from "react";
import { AiMonitorContext } from "../context";

export default function useAiMonitorAPI() {
    const aiMonitorAPI = useContext(AiMonitorContext);
    return aiMonitorAPI;
}