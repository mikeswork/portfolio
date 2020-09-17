import React, { PureComponent } from "react";
import NavButton from "./NavButton";
import "./Nav.css";

class Nav extends PureComponent {
	nextId() {
		this.uniqueId = this.uniqueId || 0
		return this.uniqueId++
	}
	
	render() {
		return (
			<div className={`nav-wrapper${this.props.currPage ? " in-section" : ""}`}>
				<div className="nav">
					{this.props.pages.map((page) => {
						return (
							<NavButton
								key={this.nextId()}
								text={page.title}
								to={page.to}
								currPage={this.props.currPage}
							/>
						);
					})}
				</div>
			</div>
		);
	}
}

export default Nav;
