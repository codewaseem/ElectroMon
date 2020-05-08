import React from "react";

const StyledIcon = () => <span>

    <img src
</span>`
  svg {
    height: 25px;
    width: 25px;
    fill: ${({ theme }) => theme.staticColors.limeGreen};
  }
`;

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
