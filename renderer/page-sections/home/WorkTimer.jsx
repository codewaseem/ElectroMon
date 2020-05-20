import React from "react";
import useTimer from "../../hooks/useTimerComponent";
import { WORK_TIMER } from "../../../constants";
import OptionsCard from "../../components/card";
import { WorkIcon } from "../../components/icons";

export default function WorkTimer() {
  const [timer, isTimerActive] = useTimer(WORK_TIMER, "Worked Today");

  return (
    <OptionsCard icon={WorkIcon} title="Work" invert={isTimerActive}>
      {timer}
    </OptionsCard>
  );
}
