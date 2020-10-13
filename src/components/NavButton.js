import React from 'react';
import { NavHashLink as NavLink } from 'react-router-hash-link';
import styled, { css } from 'styled-components';
import * as mixins from './mixins'
import { headerMode } from "./Header";

const transDur = `0.1s`;

const Link = styled(NavLink)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    width: 250px;
    min-width: 100px;

    margin: 2px 1px 0;
    
    ${mixins.dropShadow()}
    transition: all ${transDur};

    .btn-bg {
        background-color: #ccc;
        ${mixins.abs()}
        
        @media (${mixins.snapPts.minMed}) { transform: skew(10deg); }
        
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
            background-color: #364f65;
        }
        .btn-text {
            color: white;
        }
    }
    &:active {
        transform: translateY(7px);
    }

    &.selected {
        .btn-bg {
            background-color: #364f65;
        }
        .btn-text {
            color: white;
        }
    }

    ${props => props.$mode === headerMode.full && `
        width: unset;
        min-width: 250px;
        margin: 5px 0;
        
        &:nth-child(2) {
            min-width: 225px;
        }

        &:nth-child(3) {
            min-width: 200px;
        }

        .btn-bg {
            height: 0;
            @media (${mixins.snapPts.minMed}) { transform: none; }
            background-color: transparent;
            border-top: 30px solid #ffffffcc;
            border-right: 10px solid transparent;
            border-left: 10px solid transparent;
        }

        &:hover {
            .btn-bg {
                transform: scaleX(1.25);
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

    ${props => props.$twitch && css`
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
    `}
`

export default function NavButton({to, text, mode, suppressAnim}) {
    
    return (
        <Link to={to} activeClassName="selected" $mode={mode} $twitch={mode === headerMode.full && !suppressAnim}>
            <div className="btn-bg"></div>
            <div className="btn-text">{text}</div>
        </Link>
    )
}