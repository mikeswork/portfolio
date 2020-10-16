import React from "react";
import Section from "./Section";
import pageData from "../data/pageData.json";

const VideoContent = (props) => {
    return (
        <div style={{height: "100vh"}}></div>
    )
}

const VideoSection = (props) => {
    return (
        <Section path={pageData.pages.video.path} title="Video" className={props.className}>
            <VideoContent/>
        </Section>
    )
}

export default VideoSection;