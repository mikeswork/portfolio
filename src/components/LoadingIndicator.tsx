import React from "react";
import styled, { keyframes } from "styled-components";

const dot = (props) => {
    return (<span className={props.className}> . </span>)
}

const showDots = keyframes`
    0% { opacity: 0; }
    49% { opacity: 0; }
    50% { opacity: 1; }
`;

const Dot = styled(dot)`
    animation-name: ${showDots};
    animation-duration: 1.2s;
    animation-iteration-count: infinite;
    animation-delay: ${props => props.delay || `0s`};
`

const indicator = (props) => {
	return (
		<div className={props.className}>
			<Dot delay="0.3s"/>
			<Dot delay="0.2s"/>
			<Dot delay="0.1s"/>

			<span>{props.children || "Loading"}</span>

			<Dot delay="0.1s"/>
			<Dot delay="0.2s"/>
            <Dot delay="0.3s"/>
		</div>
	);
};

const Indicator = styled(indicator)`
    font-size: 1.5em;
`;

export default Indicator;