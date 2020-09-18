import React from "react";
import Nav from "./Nav";
import pageData from "../data/pageData.json";
import "./Header.scss";

export default function Header(props) {
	return (
		<div className="header">
			<h1>Michael Richardson - Portfolio</h1>

			<Nav pages={pageData.pages} />
		</div>
	);
}
