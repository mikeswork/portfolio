import React from "react";
import { NavHashLink as NavLink } from "react-router-hash-link";
import Nav from "./Nav";
import pageData from "../data/pageData.json";
import styled from 'styled-components';
import * as mixins from './mixins'

export const headerMode = {
    default: "full",
    full: "full",
    stickTop: "stickTop",
    stickBottom: "stickBottom"
} 

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100vh;
    transition: opacity 0.25s;

    h1 {
        margin: 10vh 0 0;
        padding: 0 3vw;
        ${mixins.dropShadow()}
        text-align: center;
        text-transform: uppercase;
        color: white;
        font-size: 3.8em;
        letter-spacing: 0.05em;
        font-weight: normal;
        background-color: #4b5e7a;
        mix-blend-mode: multiply;
    }

    ${props => props.visible === false && `
        opacity: 0;
    `}

    ${props => props.$mode === headerMode.stickTop && `
        position: sticky;
        top: 0;
        height: unset;

        h1 {
            margin: unset;
            padding: 1vh 0 0;
            font-size: 2em;
        }
    `}

    ${props => props.$mode === headerMode.stickBottom && `
        justify-content: flex-end;
        position: sticky;
        top: 80vh;
        height: 20vh;

        h1 {
            margin: unset;
            font-size: 2em;
        }
    `}
`

export default function Header({ mode = headerMode.default, visible = true, id, to }) {
    // The <h1> at the top will be a clickable NavLink if property "to" is set
    const headerEl = to ? (
		<NavLink to={to}>
			<h1>Michael Richardson - Portfolio</h1>
		</NavLink>
	) : (
		<h1>Michael Richardson - Portfolio</h1>
	);

	return (
		<Container id={id} visible={visible} $mode={mode}>
			{headerEl}

			<Nav pages={pageData.pages} mode={mode} />
		</Container>
	);
}
