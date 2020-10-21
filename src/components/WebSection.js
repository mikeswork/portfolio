import React from "react";
import styled from "styled-components";
import { snapPts } from "../util/mixins";
import Section from "./Section";
import Thumbnail from "./Thumbnail";
import pageData from "../data/pageData.json";

const images = require.context('../img');

const ThumbGroup = styled.div`
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

    @media (${snapPts.maxBig}) {
        flex-direction: column;
        align-items: center;
    }
`

const WebSection = (props) => {
    return (
        <Section path={pageData.pages.web.path} title={pageData.pages.web.title} className={props.className}>
            <WebContent />
        </Section>
    )
}

export default WebSection;