import React, { PureComponent } from "react";
import NavButton from "./NavButton";
import "./Nav.scss";

class Nav extends PureComponent {
	nextId() {
		this.uniqueId = this.uniqueId || 0;
		return this.uniqueId++;
	}

	render() {
		return (
			<div className="nav">
				{this.props.pages.map((page) => {
					return (
						<NavButton key={this.nextId()} text={page.title} to={page.to} currPage={this.props.currPage} />
					);
				})}
			</div>
		);
	}
}

export default Nav;
