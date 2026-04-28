import React from "react";
import styled from "styled-components";
import Section from "./Section";
import Thumbnail from "./Thumbnail";
import pageData from "../data/pageData.json";

const images = require.context('../img');

const webContent = (props) => {
    const examples = pageData.pages.web.content;

    let thumbId = 0;

    return (
        <div className={props.className}>
            {
                examples.map(example => (
                    <Thumbnail key={thumbId++} tSrc={images(example.thumbSrc)} info={example.info} />
                ))
            }
        </div>
    )
}

const WebContent = styled(webContent)`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`

const WebSection = (props) => {
    return (
        <Section path={pageData.pages.web.path} title={pageData.pages.web.title}>
            <WebContent />
        </Section>
    )
}

export default WebSection;