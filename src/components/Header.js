import React from "react";
import { NavHashLink as NavLink } from "react-router-hash-link";
import Nav from "./Nav";
import pageData from "../data/pageData.json";
import styled from "styled-components";
import * as mixins from "../util/mixins";
import Email from "./Email";
import mountainBg from "../img/mountains-bg.jpg";

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

const Container = styled.div`
	z-index: 1;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	height: 100vh;
	transition: opacity 0.25s, transform 0.1s;

	h1 {
		margin: 0;
		padding: 0 3vw;
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
            font-size: 2.5em;
            padding: 1.5vh 3vw;
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
		props.visible === false &&
		`
        opacity: 0;
        transform: translateY(-30%);
    `}
`;

export default function Header({ mode = headerMode.default, visible = true, id, to }) {
	// The <h1> at the top will be a clickable NavLink if property "to" is set
	const headerEl = to ? (
		<Link to={to}>
			<h1 id="main-header">{pageData.title}</h1>
		</Link>
	) : (
		<h1 id="main-header">{pageData.title}</h1>
	);

	return (
		<Container id={id} visible={visible} $mode={mode}>
			{headerEl}

            <Email visible={mode === headerMode.full}/>

			<Nav pages={[pageData.pages.web, pageData.pages.resume, pageData.pages.video]} mode={mode} />
		</Container>
	);
}
