import React, { PureComponent } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import "./components/Header.css";
import Nav from "./components/Nav";
import Content from "./components/Content";
import bgvid from "./vid/background_2.mp4";

import pageData from "./data/pageData.json";
// import { render } from '@testing-library/react';

class App extends PureComponent {
	click() {
		// var mainApp = document.getElementById('mainApp');
		//mainApp.classList.remove("flash");
		//void mainApp.offsetWidth;
		//mainApp.classList.add("flash")
	}

	render() {
        let uid = 0;

		var pages = pageData.pages.map((page) => {
		
			return (
				<Route path={page.to} key={uid++}>
					<h1 className="sub">Michael Richardson - {page.title}</h1>

					<Content htmlContent={page.htmlContent} />
					<Nav pages={pageData.pages} currPage={page.to} />
				</Route>
			);
		});

		return (
			<div className="App" id="mainApp" onClick={this.click}>
				<video className="bg-vid" autoPlay={true} loop={true}>
					<source src={bgvid} />
				</video>

				<Router>
					<Switch>
						{pages}

						<Route path="/">
							<h1>Michael Richardson - Portfolio</h1>

							<Content htmlContent={[]} />
							<Nav pages={pageData.pages} />
						</Route>
					</Switch>
				</Router>
			</div>
		);
	}
}

export default App;
