import React, { useState } from "react";
import styled, { css } from "styled-components";
import NavButton from "./NavButton";
import { headerMode } from "./Header";
import * as mixins from "../util/mixins";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 41vh;

	${(props) =>
		props.$mode === headerMode.stickTop &&
		`
			flex-direction: row;
			justify-content: center;
			margin-top: unset;
        `}

	${(props) =>
		props.$mode === headerMode.full &&
		!props.$suppressTwitch &&
		css`
			a:nth-child(1) {
				${mixins.twitchDown("1s", "15px")}
			}

			a:nth-child(2) {
				min-width: 225px;
				${mixins.twitchDown("1.05s", "15px")}
			}

			a:nth-child(3) {
				min-width: 200px;
				${mixins.twitchDown("1.1s", "15px")}
			}
		`}
`;

export default function Nav({ mode = headerMode.default, pages, currPage }) {
	var uniqueId = 0;

	const [isInteracting, setIsInteracting] = useState(false);

	const interactionTest = (e) => {
		const event = e.nativeEvent.type;

		if (event === "mouseover" && !isInteracting) {
			setIsInteracting(true);
		} else if (event === "mouseout" && isInteracting) {
			setIsInteracting(false);
		}
	};

	return (
		<Container
			$mode={mode}
			onMouseOver={interactionTest}
			onMouseOut={interactionTest}
			$suppressTwitch={isInteracting}
		>
			{pages.map((page) => {
				return <NavButton key={uniqueId++} text={page.title} to={page.path} currPage={currPage} mode={mode} />;
			})}
		</Container>
	);
}
