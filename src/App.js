import React, { Suspense } from "react";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import Header, { headerMode } from "./components/Header";
import useScrolledTo from "./util/useScrolledTo";
import LoadingIndicator from "./components/LoadingIndicator";
import "./App.css";

const WebSection = React.lazy(() => import("./components/WebSection"));
const ResumeSection = React.lazy(() => import("./components/ResumeSection"));
const VideoSection = React.lazy(() => import("./components/VideoSection"));

export default function App() {
    const showSecondHead = !useScrolledTo("home", 0);
    const atTop = useScrolledTo("main-header", 0);

	return (
		<Router>
			<div className="App viewing-content" id="mainApp">
				<Header id="home" />
				
                <div id="observer-anchor" />
				<Header mode={headerMode.stickTop} visible={showSecondHead} to={"/home/#home"} />

                <Suspense fallback={<div style={{textAlign: "center"}}><LoadingIndicator /></div>}>
                    <WebSection/>
                </Suspense>
                <Suspense fallback={<div style={{textAlign: "center"}}><LoadingIndicator /></div>}>
                    <ResumeSection/>
                </Suspense>
                <Suspense fallback={<div style={{textAlign: "center"}}><LoadingIndicator /></div>}>
                    <VideoSection/>
                </Suspense>

                {atTop && <Redirect to={"/"}/>}
			</div>
		</Router>
	);
}
