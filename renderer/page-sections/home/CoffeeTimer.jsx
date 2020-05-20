import React from "react";
import useTimer from "../../hooks/useTimerComponent";
import { COFFEE_TIMER } from "../../../constants";
import OptionsCard from "../../components/card";
import { CoffeeIcon } from "../../components/icons";

export default function CoffeeTimer() {
  const [timer, isTimerActive] = useTimer(COFFEE_TIMER, "Coffee Time");

  return (
    <OptionsCard icon={CoffeeIcon} title="Coffee" invert={isTimerActive}>
      {timer}
    </OptionsCard>
  );
}
