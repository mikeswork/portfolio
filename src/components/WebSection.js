import React from "react";
import styled from "styled-components";
import * as mixins from "./mixins";
import Section from "./Section";
import Thumbnail from "./Thumbnail";

import sharkThumb from "../img/shark-thumb.jpg";
import sharkImg from "../img/shark.jpg";
import hboThumb from "../img/hbo-thumb.jpg";
import hboImg from "../img/hbo.jpg";
import outlanderThumb from "../img/outlander-sage-thumb.jpg";
import outlanderImg from "../img/outlander-sage.jpg";
import hallmarkThumb from "../img/hallmark-thumb.jpg";
import hallmarkImg from "../img/hallmark.jpg";

const snapPts = {
    minMed: 'min-width: 930px',
    maxMed: 'max-width: 930px',
    maxBig: 'max-width: 1700px'
}

const odd = (props) => {
    return (
        <div className={props.className}>
            {props.children}
        </div>
    )
}

const Odd = styled(odd)`
    display: flex;

    @media (${snapPts.maxMed}) {
        flex-direction: column;
    }
`

const Even = styled(Odd)`
    @media (${snapPts.maxBig}) and (${snapPts.minMed}) {
        margin-left: 97px;
    }
`

const webContent = (props) => {
    return (
        <div className={props.className}>
            <Odd>
                <Thumbnail tSrc={sharkThumb} fSrc={sharkImg} />
                <Thumbnail tSrc={hboThumb} fSrc={hboImg} />
            </Odd>
            <Even>
                <Thumbnail tSrc={outlanderThumb} fSrc={outlanderImg} />
                <Thumbnail tSrc={hallmarkThumb} fSrc={hallmarkImg} />
            </Even>
        </div>
    )
}

const WebContent = styled(webContent)`
    display: flex;
    justify-content: center;
    padding: 1vh 1vw;

    @media (${snapPts.maxBig}) {
        flex-direction: column;
        align-items: center;
    }
`

const WebSection = (props) => {
    return (
        <Section id="webdev" title="Web Dev" className={props.className}>
            <WebContent />
        </Section>
    )
}

export default WebSection;