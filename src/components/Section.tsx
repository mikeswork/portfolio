import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import useScrolledTo from "../util/useScrolledTo";
import * as mixins from "../util/mixins";
import bottomPng from "../img/mountains-abstract-bottom-bg-2.png";
import topPng from "../img/mountains-abstract-top-bg.png";

const Sect = function ({ path = "", ...props }) {
	// console.log("rendering", path, "section")
	const sectId = path.split("#").pop();

    const history = useHistory();
    
    // Toggle which section is indicated in the nav using the hash route
    useScrolledTo(
		`#${sectId} .header-hit, #${sectId} .footer-hit`,
		(isIntersecting) => {
			if (path && isIntersecting) history.replace(path);
		},
		1.0
	);

	return (
		<div className={props.className} id={sectId}>
            <div className="header-hit"></div>
            <div className="footer-hit"></div>
            
			<h2>{props.title}</h2>

			<div className="content">{props.children}</div>
		</div>
	);
};

const Section = styled(Sect)`
    position: relative;
	min-height: 50vh;
	background-color: #000e1c;
	background-image: url(${bottomPng});
	background-position: center bottom;
	background-repeat: no-repeat;

    /* These two divs are needed to determine if user is looking at current section (useScrolledTo): */
    .header-hit, .footer-hit {
        position: absolute;
        width: 100%;
        height: 60vh;
        background-color: transparent;
        pointer-events: none;
    }
    .footer-hit { bottom: 0px;}

	h2 {
		margin: 0;
		padding: 14vh 0 0;
		background-image: url(${topPng});
		background-position: center top;
		background-repeat: no-repeat;
		text-align: center;
		font-size: 2.5em;
		${mixins.letterSpace()}
	}

	.content {
		padding: 40px 3vw 75px;
	}
`;

export default Section;
