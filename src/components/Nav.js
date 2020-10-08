import React, { useState } from "react";
import styled from "styled-components";
import NavButton from "./NavButton";
import { headerMode } from "./Header";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 41vh;

	${(props) =>
		props.$mode === headerMode.stickTop && `
			flex-direction: row;
			justify-content: center;
			margin-top: unset;
		`}
`;

export default function Nav({ mode = headerMode.default, pages, currPage }) {
	var uniqueId = 0;

	const [animateBtns, setAnimateBtns] = useState(mode === headerMode.full);

	const isInteracting = (mouseOver) => {
		if (mode === headerMode.full) {
			if (mouseOver && animateBtns) {
				setAnimateBtns(false);
			} else if (!mouseOver && !animateBtns) {
				setAnimateBtns(true);
			}
		}
	};

	return (
		<Container
            $mode={mode}
			onMouseOver={isInteracting.bind(this, true)}
			onMouseOut={isInteracting.bind(this, false)}
		>
			{pages.map((page) => {
				return (
					<NavButton
						key={uniqueId++}
						text={page.title}
						to={page.to}
						currPage={currPage}
						idleAnimation={animateBtns}
					/>
				);
			})}
		</Container>
	);
}
