import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header, { headerMode } from "./components/Header";
import Section from "./components/Section";

import "./App.css";

export default function App() {
    const [showSecondHead, setShowSecondHead] = useState(false);

	useEffect(() => {
		// console.log("[useEffect]")
		if (
			"IntersectionObserver" in window &&
			"IntersectionObserverEntry" in window &&
			"intersectionRatio" in window.IntersectionObserverEntry.prototype
		) {
			let observer = new IntersectionObserver((entries) => {
				setShowSecondHead(entries[0].boundingClientRect.y < 0);
			});

			observer.observe(document.querySelector("#observer-anchor"));

			return () => {
				observer.disconnect();
			};
		}
	});

	return (
		<Router>
			<div className="App viewing-content" id="mainApp">
				<Header id="home" />
				
                <div id="observer-anchor" />
				<Header mode={headerMode.stickTop} visible={showSecondHead} to={"/home/#home"} />

                <Section id="webdev" title="Web Dev">
                    Sites developed:
                </Section>
                <Section id="resume" title="Resume"></Section>
                <Section id="video" title="Video"></Section>
			</div>
		</Router>
	);
}
