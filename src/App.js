import React, { Suspense } from "react";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import styled from "styled-components";
import Header, { headerMode } from "./components/Header";
import useScrolledTo from "./util/useScrolledTo";
import LoadingIndicator from "./components/LoadingIndicator";
import mountainBg from "./img/mountains-bg.jpg";
import { snapPts } from "./util/mixins";

const WebSection = React.lazy(() => import("./components/WebSection"));
const ResumeSection = React.lazy(() => import("./components/ResumeSection"));
const VideoSection = React.lazy(() => import("./components/VideoSection"));

const AppContent = styled.div`
    background-image: url(${mountainBg});
    background-size: contain;
    background-repeat: no-repeat;
    color: white;

    font-family: 'Bebas Neue', sans-serif;
	-webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    @media only screen and (${snapPts.maxLarge}) {
        background-size: auto;
        background-position-x: center;
        background-position-y: -5%;
    }

    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
    }

    .basicLightbox {
        background: rgba(0,0,0,0.8);
    }
`

export default function App() {
    const showSecondHead = !useScrolledTo("home", 0);
    const atTop = useScrolledTo("main-header", 0);

	return (
		<Router>
			<AppContent className="App viewing-content" id="mainApp">
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
			</AppContent>
		</Router>
	);
}
