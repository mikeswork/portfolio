import React from "react";
import Section from "./Section";
import pageData from "../data/pageData.json";

const ResumeContent = (props) => {
    return (
        <div style={{height: "100vh"}}></div>
    )
}

const ResumeSection = (props) => {
    return (
        <Section path={pageData.pages.resume.path} title={pageData.pages.resume.title} className={props.className}>
            <ResumeContent/>
        </Section>
    )
}

export default ResumeSection;