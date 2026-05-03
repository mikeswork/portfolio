import styled from "styled-components";
import * as mixins from "../util/mixins";
import { headerMode } from "./Header";
import { NavLink } from "react-router-dom";

const transDur = `0.1s`;

const Link = styled(NavLink)<{ $mode: string }>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  border-top: 2px solid black;
  border-bottom: 2px solid black;

  ${(props) =>
    props.$mode === headerMode.stickTop &&
    `width: 100%;
      @media (${mixins.snapPts.minMed}) {
      width: 250px;
    }`}

  min-width: 100px;

  text-decoration: none;
  font-size: 1.25em;

  ${mixins.dropShadow()}
  transition: all ${transDur};

  @media (${mixins.snapPts.minMed}) {
    transform: skew(7.7deg);
  }

  .btn-bg {
    background-color: #ccc;
    ${mixins.abs()}

    z-index: -1;
    transition: all ${transDur};
  }

  .btn-text {
    margin-top: 4px;
    color: #0b1b31;
    ${mixins.letterSpace()}

    transition: all ${transDur};
    @media (${mixins.snapPts.minMed}) {
      transform: skew(-7.7deg);
    }
  }

  &:hover {
    .btn-bg {
      background-color: #364f65;
    }
    .btn-text {
      color: white;
    }
  }
  &:active {
    transform: translate(1px, 2px);
  }

  &.selected {
    .btn-bg {
      background-color: #364f65;
    }
    .btn-text {
      color: white;
    }
  }

  ${(props) =>
    props.$mode === headerMode.full &&
    `
      width: unset;
      min-width: 250px;
      margin: 5px 0;
      border: none;
      
      &:nth-child(2) {
          min-width: 225px;
      }

      &:nth-child(3) {
          min-width: 200px;
      }

      @media (${mixins.snapPts.minMed}) { transform: none; }

      .btn-bg {
        height: 0;
        background-color: transparent;
        border-top: 30px solid #ffffffcc;
        border-right: 10px solid transparent;
        border-left: 10px solid transparent;
      }

      .btn-text {
        @media (${mixins.snapPts.minMed}) { transform: none; }
      }

      &:hover {
        .btn-bg {
          transform: scaleX(1.05);
          background-color: transparent;
          border-top-color: #364f65;
        }
      }

      &:active {
        transform: scale(0.9);
      }

      &.selected {
        .btn-bg {
          background-color: transparent;
          border-top-color: #364f65;
        }
      }
  `}
`;

export default function NavButton({
  to,
  text,
  mode,
}: {
  to: string;
  text: string;
  mode: string;
}) {
  return (
    <Link
      to={to}
      className={({ isActive }) => (isActive ? "selected" : "")}
      $mode={mode}
    >
      <div className="btn-bg"></div>
      <div className="btn-text">{text}</div>
    </Link>
  );
}
