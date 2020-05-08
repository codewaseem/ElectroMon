import React from "react";
import Work from "../../assets/icons/work.svg";
import Timer from "../../assets/icons/timer.svg";
import Coffee from "../../assets/icons/coffee.svg";
import Lunch from "../../assets/icons/lunch.svg";
import Leave from "../../assets/icons/leave.svg";
import Exit from "../../assets/icons/exit.svg";
import styles from "./styles.module.scss";

const StyledIcon = ({ children }) => (
  <span className={styles.svgIconContainer}>{children}</span>
);

export const WorkIcon = () => {
  return (
    <StyledIcon>
      <Work />
    </StyledIcon>
  );
};

export const TimerIcon = () => {
  return (
    <StyledIcon>
      <Timer />
    </StyledIcon>
  );
};

export const CoffeeIcon = () => {
  return (
    <StyledIcon>
      <Coffee />
    </StyledIcon>
  );
};

export const LunchIcon = () => {
  return (
    <StyledIcon>
      <Lunch />
    </StyledIcon>
  );
};

export const LeaveIcon = () => {
  return (
    <StyledIcon>
      <Leave />
    </StyledIcon>
  );
};

export const ExitIcon = () => {
  return (
    <StyledIcon>
      <Exit />
    </StyledIcon>
  );
};
