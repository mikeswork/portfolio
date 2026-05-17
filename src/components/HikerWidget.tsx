import { useState } from "react";
import styled, { keyframes } from "styled-components";
import hiker from "../img/hiker.svg";
import { snapPts } from "../util/mixins";

const HikerTooltip = styled.div<{ $visible: boolean }>`
  position: absolute;
  top: 50%;
  right: 100%;
  transform: translate(0, -50%);
  margin-right: 6px;
  min-width: 260px;
  max-width: 400px;
  padding: 16px 20px;
  border-radius: 4px;
  background: rgba(14, 20, 33, 0.95);
  color: #f2f2f2;
  font-size: 0.95rem;
  line-height: 1.5;
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  pointer-events: none;
  transition: opacity 0.2s ease-in-out;
  box-shadow: 0 0px 30px rgba(255, 255, 255, 0.3);
  font-family: sans-serif;
`;

const HikerSpot = styled.div`
  position: absolute;
  top: 13vw;
  right: 120px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  z-index: 2;

  @media only screen and (${snapPts.maxMed}) {
    top: 22vw;
  }
  @media only screen and (${snapPts.maxSmall}) {
    top: 30vw;
    right: 28px;
  }

  &:hover ${HikerTooltip} {
    opacity: 1;
  }
`;

const bulbFlicker = keyframes`
  0%, 90%, 100% {
    border-color: rgba(255, 255, 255, 0);
  }
  92% {
    border-color: rgba(255, 255, 255, 0.95);
  }
  93% {
    border-color: rgba(255, 255, 255, 0);
  }
  94.5% {
    border-color: rgba(255, 255, 255, 0.95);
  }
  95.5% {
    border-color: rgba(255, 255, 255, 0);
  }
  96.5% {
    border-color: rgba(255, 255, 255, 0.95);
  }
  97.5% {
    border-color: rgba(255, 255, 255, 0);
  }
`;

const HikerIcon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0);
  border-radius: 50%;
  padding: 6px;
  animation: ${bulbFlicker} 5s infinite;

  img {
    display: block;
    width: 32px;
    height: auto;
  }

  @media only screen and (${snapPts.maxLarge}) {
    opacity: 0.5;
  }
`;

export default function HikerWidget() {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  return (
    <HikerSpot
      onClick={() => setTooltipVisible((value) => !value)}
      onMouseEnter={() => setTooltipVisible(true)}
      onMouseLeave={() => setTooltipVisible(false)}
    >
      <HikerTooltip $visible={tooltipVisible}>
        Standing on the heights of Buck Creek Pass, I took this picture of
        Tenpeak Mountain and Glacier Peak. We got here after four days of
        hiking, hard on the body and even harder on the ego. Ask me to tell you
        this story some time.
      </HikerTooltip>
      <HikerIcon>
        <img src={hiker} alt="Legend of Buck Creek Pass" />
      </HikerIcon>
    </HikerSpot>
  );
}
