import { useState } from "react";
import styled, { css } from "styled-components";
import NavButton from "./NavButton";
import { headerMode } from "./Header";
import * as mixins from "../util/mixins";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 2px;
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

const Buttons = styled.div<{ $mode: string; $suppressTwitch: boolean }>`
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
    !props.$suppressTwitch &&
    css`
      a:nth-child(1) {
        ${mixins.twitchDown("2.5s")}
      }

      a:nth-child(2) {
        min-width: 225px;
        ${mixins.twitchDown("2.55s")}
      }

      a:nth-child(3) {
        min-width: 200px;
        ${mixins.twitchDown("2.6s")}
      }
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
        $suppressTwitch={isInteracting}
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
