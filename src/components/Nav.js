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

	const [suppressAnim, setSuppressAnim] = useState(false);

	const isInteracting = (e) => {
        const event = e.nativeEvent.type;

        if (event === "mouseover" && !suppressAnim) {
            setSuppressAnim(true);
        } else if (event === "mouseout" && suppressAnim) {
            setSuppressAnim(false);
        }
	};

	return (
		<Container
            $mode={mode}
            onMouseOver={isInteracting}
            onMouseOut={isInteracting}
		>
			{pages.map((page) => {
				return (
					<NavButton
						key={uniqueId++}
						text={page.title}
						to={page.path}
                        currPage={currPage}
                        mode={mode}
						suppressAnim={suppressAnim}
					/>
				);
			})}
		</Container>
	);
}
