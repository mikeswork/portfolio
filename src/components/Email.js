import React from "react";
import styled from "styled-components";

const email = ({className}) => {
	return (
		<div className={className}>
			<a href="mailto:contact@mikeswork.info">mailto:</a> <span className="address">contact@mikeswork.info</span>
		</div>
	);
};

const Email = styled(email).attrs(props => ({
    visible: props.visible === undefined ? true : props.visible,
    margin: props.margin ? `margin: ${props.margin}` : `margin: 0`
}))`
    ${props => props.margin};
    text-align: center;
	text-transform: none;
    font-size: 1.4em;
    
    ${props => !props.visible && `display: none;`}

	& > * {
		padding: 0.1em 0.5em 0;
	}

	a {
		background-color: #ffffff70;
		color: black;
		text-transform: none;
	}

	.address {
		background-color: #000000aa;
	}
`;

export default Email;
