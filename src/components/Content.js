import React, { Component } from "react";
// import Button from './Button';
import "./Content.css";

class Content extends Component {
	render() {
		console.log("[Content] [render]");

		var { htmlContent } = this.props || [];

		return (
			<div className="content">
				{htmlContent.map((section) => {
					var title = section.title || "";
					var img = section.img || "";
					var text = section.text || "";

					return (
						<div className="section">
							<h2>{title}</h2>
							<img width="640" height="480" src={img} alt="" />
							<p className="description">{text}</p>
						</div>
					);
				})}
			</div>
		);
	}
}

export default Content;
