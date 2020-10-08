import React from "react";
import styled from "styled-components";
import * as mixins from "./mixins";
import bottomPng from "../img/mountains-abstract-bottom-bg-2.png";
import topPng from "../img/mountains-abstract-top-bg.png";

const Sect = function VideoSection({className, ...props}) {
    return (
        <div className={className} id={props.id}>
            <h2>{props.title}</h2>

            <div className="content">
                {props.children}
            </div>
        </div>
    )
}

const Section = styled(Sect)`
    min-height: 50vh;
    background-color: #000e1c;
    background-image: url(${bottomPng});
    background-position: center bottom;
    background-repeat: no-repeat;

    h2 {
        margin: 0;
        padding: 14vh 0 0;
        background-image: url(${topPng});
        background-position: center top;
        background-repeat: no-repeat;
        text-align: center;
        font-size: 2.5em;
        ${mixins.letterSpace()}
    }

    .content {
        text-align: center;
        padding: 1vh 1vw;
    }
`

export default Section;