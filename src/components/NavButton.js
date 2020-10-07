import React from 'react';
import { NavHashLink as NavLink } from 'react-router-hash-link';
import styled from 'styled-components';
import * as mixins from './mixins'

const transDur = `0.1s`;

const MainLink = styled(NavLink)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-width: 250px;
    margin: 5px 0;
    ${mixins.dropShadow()}
    transition: all ${transDur};

    &:nth-child(2) {
        min-width: 225px;
    }

    &:nth-child(3) {
        min-width: 200px;
    }

    .btn-bg {
        content: '';
        ${mixins.abs()}

        background-color: transparent;
        border-top: 30px solid #ffffffcc;
        border-right: 10px solid transparent;
        border-left: 10px solid transparent;
        height: 0;
        z-index: -1;

        transition: all ${transDur};
    }

    .btn-text {
        margin-top: 3px;
        color: #0b1b31;
        ${mixins.letterSpace()}

        transition: all ${transDur};
    }

    &:hover {
        .btn-bg {
            border-top-color: #364f65;
            transform: scaleX(1.25);
        }
        .btn-text {
            color: white;
        }
    }
    &:active {
        transform: scale(0.9);
    }

    &.selected {
        .btn-bg {
            border-top-color: #364f65;
        }
        .btn-text {
            color: white;
        }
    }
`

const TwitchingLink = styled(MainLink)`
    &:nth-child(1) {
        ${mixins.twitchDown('1s', '15px')}
    }

    &:nth-child(2) {
        min-width: 225px;
        ${mixins.twitchDown('1.05s', '15px')}
    }

    &:nth-child(3) {
        min-width: 200px;
        ${mixins.twitchDown('1.1s', '15px')}
    }
`

export default function NavButton({to, text, animate = true}) {
    console.log("btn nav", animate)

    const Link = animate ? TwitchingLink : MainLink;

    return (
        <Link to={to} activeClassName="selected">
            <div className="btn-bg"></div>
            <div className="btn-text">{text}</div>
        </Link>
    )
}