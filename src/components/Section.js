import React from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import useScrolledTo from "../util/useScrolledTo";
import * as mixins from "../util/mixins";
import bottomPng from "../img/mountains-abstract-bottom-bg-2.png";
import topPng from "../img/mountains-abstract-top-bg.png";

const Sect = function (props) {
    // console.log(props)
    const splitUrl = props.path.split("#");
    const sectId = splitUrl[splitUrl.length-1];
    
    const scrolledToCurrSect = useScrolledTo(sectId);

	return (
		<div className={props.className} id={sectId}>
			<h2>{props.title}</h2>

			<div className="content">{props.children}</div>

			{scrolledToCurrSect && <Redirect to={props.path}/>}
		</div>
	);
};

const Section = styled(Sect)`
	min-height: 50vh;
	background-color: #000e1c;
	background-image: url(${bottomPng});
	background-position: center bottom;
	background-repeat: no-repeat;

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
