import { NavHashLink as NavLink } from "react-router-hash-link";
import Nav from "./Nav";
import styled from "styled-components";
import * as mixins from "../util/mixins";
import Email from "./Email";
import mountainBg from "../img/mountains-bg.jpg";
import HikerWidget from "./HikerWidget";

export const headerMode = {
  default: "full",
  full: "full",
  stickTop: "stickTop",
  stickBottom: "stickBottom",
};

const Link = styled(NavLink)`
  text-decoration: none;
  font-size: 1.25em;
`;

const Container = styled.div<{ $visible: boolean; $mode: string }>`
  z-index: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100vh;
  transition:
    opacity 0.25s,
    transform 0.1s;

  h1 {
    margin: 0;
    padding: 4px 3vw 0;
    ${mixins.dropShadow()}
    text-align: center;
    text-transform: uppercase;
    color: white;
    font-size: 3.8em;
    letter-spacing: 0.05em;
    font-weight: normal;
    background-color: #38465c;
    mix-blend-mode: multiply;

    @media (${mixins.snapPts.maxLarge}) {
      background-color: #19202d;
      mix-blend-mode: normal;
      color: #eeeeeedd;
      opacity: 0.9;
      font-size: 3.4em;
    }

    @media (${mixins.snapPts.maxSmall}) {
      font-size: 2.6em;
    }
  }

  ${(props) =>
    props.$mode === headerMode.stickTop &&
    `
      position: sticky;
      top: 0;
      height: unset;

      h1 {
        margin: unset;
        opacity: 1;
        padding: 1vh 0 0;
        font-size: 2em;
        background-image: url(${mountainBg});
        background-size: cover;
        background-repeat: no-repeat;
        background-blend-mode: soft-light;
        background-position-y: 45%;
        background-color: #2d394a;
        border-bottom: 5px solid #d9d9d9;

        @media (${mixins.snapPts.maxSmall}) {
            font-size: 1.5em;
            padding: 1vh 3vw;
        }
      }
    `}

  ${(props) =>
    props.$mode === headerMode.stickBottom &&
    `
      justify-content: flex-end;
      position: sticky;
      top: 80vh;
      height: 20vh;

      h1 {
        margin: unset;
        font-size: 2em;
      }
    `}

    ${(props) =>
    props.$visible === false &&
    `
      opacity: 0;
      transform: translateY(-30%);
    `}
`;

export default function Header({
  mode = headerMode.default,
  visible = true,
  ...props
}) {
  const sectId = props.id?.split("#").pop();

  // The <h1> at the top will be a clickable NavLink if property "to" is set
  const headerEl = props.to ? (
    <Link to={props.to}>
      <HeaderWithHiker
        title={props.title}
        showHiker={mode === headerMode.full}
      />
    </Link>
  ) : (
    <HeaderWithHiker title={props.title} showHiker={mode === headerMode.full} />
  );

  return (
    <Container id={sectId} $visible={visible} $mode={mode}>
      {headerEl}

      <Nav pages={props.navPages} mode={mode} />

      <Email visible={mode === headerMode.full} />
    </Container>
  );
}

function HeaderWithHiker({
  title,
  showHiker = false,
}: {
  title: string;
  showHiker?: boolean;
}) {
  return (
    <div style={{ position: "relative" }}>
      <h1>{title}</h1>

      {showHiker && <HikerWidget />}
    </div>
  );
}
