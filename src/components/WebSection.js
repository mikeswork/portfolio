import React from "react";
import styled from "styled-components";
import { snapPts } from "./mixins";
import Section from "./Section";
import Thumbnail from "./Thumbnail";
import pageData from "../data/pageData.json";

const images = require.context('../img');

const tGroup = (props) => {
    return (
        <div className={props.className}>
            {props.children}
        </div>
    )
}

const ThumbGroup = styled(tGroup)`
    display: flex;

    @media (${snapPts.maxMed}) {
        flex-direction: column;
    }

    /* &:nth-child(even) { 
        @media (${snapPts.maxBig}) and (${snapPts.minMed}) {
            margin-left: 97px;
        }
    } */
`

const webContent = (props) => {
    const examples = pageData.pages.web.content;
    let groups = [];
    const perGroup = 2;
    
    for (let i = 0; i < examples.length; i+=perGroup) {
        let grp = [];
        for (let j = 0; j < perGroup; j++) {
            const example = examples[i+j]

            if (example !== undefined) grp.push(examples[i+j])
        }
        groups.push(grp)
    }

    let groupId = 0;
    let thumbId = 0;

    return (
        <div className={props.className}>
            {
                groups.map(group => (
                    <ThumbGroup key={groupId++}>
                        {
                            group.map(thumbData => (
                                <Thumbnail key={thumbId++} tSrc={images(thumbData.thumbSrc)} info={thumbData.info} />
                            ))
                        }
                    </ThumbGroup>
                ))
            }
        </div>
    )
}

const WebContent = styled(webContent)`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding: 1vh 1vw;

    @media (${snapPts.maxBig}) {
        flex-direction: column;
        align-items: center;
    }
`

const WebSection = (props) => {
    const splitUrl = pageData.pages.web.url.split("#");
    const sectId = splitUrl[splitUrl.length-1];

    return (
        <Section id={sectId} title="Web Dev" className={props.className}>
            <WebContent />
        </Section>
    )
}

export default WebSection;