import { useState } from "react";
import styled, { css, keyframes } from "styled-components";
import NavButton from "./NavButton";
import { headerMode } from "./Header";
import * as mixins from "../util/mixins";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 2px;
  perspective: 1000px;
`;

const ButtonBorder = styled.div`
  ${mixins.abs()}
  pointer-events: none;

  border: 4px solid #ccc;
  border-top: 0;

  @media (${mixins.snapPts.minMed}) {
    transform: skew(7.7deg);
  }
`;

const hover = keyframes`
  0% {
      transform: translateX(0px) translateY(0px) translateZ(0px);
  }
  15% {
      transform: translateX(1px) translateY(15px) translateZ(5px) rotateZ(-0.5deg);
  }
  30% {
      transform: translateX(2px) translateY(5px) translateZ(10px);
  }
  45% {
      transform: translateX(0px) translateY(30px) translateZ(30px) rotateZ(0.5deg);
  }
  60% {
      transform: translateX(1px) translateY(-10px) translateZ(0px);
  }
  75% {
      transform: translateX(-2px) translateY(5px) translateZ(-10px) rotateZ(-0.5deg);
  }
  90% {
      transform: translateX(0px) translateY(-10px) translateZ(1px);
  }
  100% {
      transform: translateX(0px) translateY(0px) translateZ(0px);
  }
`;

const Buttons = styled.div<{ $mode: string; $isInteracting: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 8vh;
  padding: 0 5px 4px 5px;

  ${(props) =>
    props.$mode === headerMode.stickTop &&
    `
			flex-direction: row;
			justify-content: center;
			margin-bottom: unset;

      width: calc(100% - 10px);
      @media (${mixins.snapPts.minMed}) {
        width: unset;
      }
  `}

  ${(props) =>
    props.$mode === headerMode.full &&
    css`
      animation-name: ${hover};
      animation-delay: 0s;
      animation-duration: 20s;
      animation-iteration-count: infinite;
      animation-timing-function: cubic-bezier(0.27, 0.01, 0.74, 0.99);
    `}
`;

export default function Nav({
  mode = headerMode.default,
  pages,
}: {
  mode?: string;
  pages: Array<{ title: string; path: string }>;
}) {
  const [isInteracting, setIsInteracting] = useState(false);

  const interactionTest = (e: React.MouseEvent) => {
    const event = e.nativeEvent.type;

    if (event === "mouseover" && !isInteracting) {
      setIsInteracting(true);
    } else if (event === "mouseout" && isInteracting) {
      setIsInteracting(false);
    }
  };

  return (
    <Container>
      <Buttons
        $mode={mode}
        onMouseOver={interactionTest}
        onMouseOut={interactionTest}
        $isInteracting={isInteracting}
      >
        {pages.map((page, i) => {
          return (
            <NavButton key={i} text={page.title} to={page.path} mode={mode} />
          );
        })}
        {mode !== headerMode.full && <ButtonBorder />}
      </Buttons>
    </Container>
  );
}
