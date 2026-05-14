import React, { Suspense, useEffect, useState } from "react";
import { HashRouter as Router, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header, { headerMode } from "./components/Header";
import Email from "./components/Email";
import useIsScrolledTo from "./util/useScrolledTo";
import LoadingIndicator from "./components/LoadingIndicator";
import mountainBg from "./img/mountains-bg.jpg";
import { snapPts } from "./util/mixins";

import pageData from "./data/pageData.json";

const WebSection = React.lazy(() => import("./components/WebSection"));
const ResumeSection = React.lazy(() => import("./components/ResumeSection"));
const VideoSection = React.lazy(() => import("./components/VideoSection"));

const AppContent = styled.div`
  background-image: url(${mountainBg});
  background-size: contain;
  background-repeat: no-repeat;
  color: white;

  font-family: "Bebas Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  @media only screen and (${snapPts.maxLarge}) {
    background-size: auto;
    background-position-x: 85%;
    background-position-y: -5%;
  }
  @media only screen and (${snapPts.maxMed}) {
    background-position-x: 80%;
  }
  @media only screen and (${snapPts.maxSmall}) {
    background-position-x: 68%;
  }

  code {
    font-family:
      source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
  }
`;

export default function App() {
  const [showSecondHead, setShowSecondHead] = useState<boolean>();

  const headerId = pageData.header.path.split("#").pop();

  useIsScrolledTo(`#${headerId}`, (isIntersecting: boolean) =>
    setShowSecondHead(!isIntersecting),
  );

  // When the user scrolls up to the top, the url/route needs to be reset to "/".
  // We do this by triggering a Redirect to "/" using "atTop" state const, instead of
  // useHistory() because useHistory conflicts with Router at this level in the hierarchy.
  const [atTop, setAtTop] = useState<boolean | null>(null);
  useIsScrolledTo(`#${headerId} #navContainer`, (isIntersecting: boolean) =>
    setAtTop(isIntersecting),
  );

  return (
    <Router>
      <Redirect to={atTop ? "/" : null} />

      <AppContent className="App viewing-content" id="mainApp">
        <Header
          id={pageData.header.path}
          title={pageData.header.title}
          navPages={[
            pageData.pages.web,
            pageData.pages.resume,
            pageData.pages.video,
          ]}
        />

        <Header
          mode={headerMode.stickTop}
          visible={showSecondHead}
          title={pageData.header.title}
          to={pageData.header.path}
          navPages={[
            pageData.pages.web,
            pageData.pages.resume,
            pageData.pages.video,
          ]}
        />

        <Suspense
          fallback={
            <div style={{ textAlign: "center" }}>
              <LoadingIndicator />
            </div>
          }
        >
          <WebSection />
        </Suspense>
        <Suspense
          fallback={
            <div style={{ textAlign: "center" }}>
              <LoadingIndicator />
            </div>
          }
        >
          <ResumeSection />
        </Suspense>
        <Suspense
          fallback={
            <div style={{ textAlign: "center" }}>
              <LoadingIndicator />
            </div>
          }
        >
          <VideoSection />
        </Suspense>

        <Email margin="1em 0 3em" />
      </AppContent>
    </Router>
  );
}

function Redirect({ to = "/" }: { to: string | null }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!to) return;

    navigate(to);
  }, [navigate, to]);

  return null;
}
