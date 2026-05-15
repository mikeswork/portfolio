import { NavHashLink as NavLink } from "react-router-hash-link";
import styled from "styled-components";
import * as mixins from "../util/mixins";
import { headerMode } from "./Header";

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
      width: 220px;
    }`}

  min-width: 5px;

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
    @media (${mixins.snapPts.minMed}) {
      transform: skew(7.7deg) scaleX(0.97) scaleY(0.91);
    }

    transform: scaleX(0.97) scaleY(0.91);
  }

  &.active {
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
      margin: 3px 0;
      border: none;
      
      &:nth-child(1) {
        clip-path: polygon(50px 1px, 50% 0, calc(100% - 50px) 1px, calc(100% - 30px) 100%, 30px 100%);
      }
      
      &:nth-child(2) {
        min-width: 300px;
        clip-path: polygon(10px 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 6px) 100%, 6px 100%, 0 50%);
      }

      &:nth-child(3) {
        clip-path: polygon(10px 0, calc(100% - 10px) 0, calc(100% - 30px) 100%, 50% 100%, 30px 100%);
      }
      &:nth-child(4) {
        clip-path: polygon(75px 0, calc(100% - 75px) 0, calc(100% - 95px) 100%, 50% 100%, 95px 100%);
      }

      @media (${mixins.snapPts.minMed}) { transform: none; }

      .btn-text {
        @media (${mixins.snapPts.minMed}) { transform: none; }
      }

      &:hover {
        .btn-bg {
          background-color: #ddd; 
        }
        .btn-text {
          color: #0b1b31;
          transform: scaleX(0.97);
        }
        
        transform: scaleX(1.07);
        &:nth-child(1) {
          transform: scaleX(1.07) translateY(-2px);
        }
        &:nth-child(2) {
          transform: scaleX(1.07) scaleY(1.05);
        }
        &:nth-child(3) {
          transform: scaleX(1.07) translateY(1px);
        }
        &:nth-child(4) {
          transform: scaleX(1.07) translateY(3px);
        }
      }

      &:active {
        transform: scale(0.95);
      }

      &.active {
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
    <Link to={to} $mode={mode}>
      <div className="btn-bg"></div>
      <div className="btn-text">{text}</div>
    </Link>
  );
}
