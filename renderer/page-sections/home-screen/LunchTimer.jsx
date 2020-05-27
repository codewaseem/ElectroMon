import React from "react";
import useTimer from "../../hooks/useTimerComponent";
import { LUNCH_TIMER } from "../../../constants";
import OptionsCard from "../../components/card";
import { LunchIcon } from "../../components/icons";

export default function LunchTimer() {
  const [timer, isTimerActive] = useTimer(LUNCH_TIMER, "Lunch Time");

  return (
    <OptionsCard icon={LunchIcon} title="Lunch" invert={isTimerActive}>
      {timer}
    </OptionsCard>
  );
}
