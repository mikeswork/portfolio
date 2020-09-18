import React, { PureComponent } from "react";
import Header from "./components/Header";
import WebSection from "./components/WebSection";

import "./App.css";

class App extends PureComponent {
	render() {
		return (
			<div className="App" id="mainApp">
				<Header />

                <WebSection />
			</div>
		);
	}
}

export default App;
