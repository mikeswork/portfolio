import React from "react";
import styled from "styled-components";
import * as lightbox from "basiclightbox";

const thumb = (props) => {
    const lightboxView = lUrl => {
        lightbox.create(`<img src=${lUrl} alt="">`).show();
    }

    return (
        <div className={props.className}>
            <img src={props.tSrc} alt="" onClick={lightboxView.bind(null, props.fSrc)} />
        </div>
    )
}

const clipPath = `polygon(0 0, calc(100% - 40px) 0, 100% 100%, 40px 100%)`;

const Thumbnail = styled(thumb)`
    margin: 40px 0 0;
    padding: 2px;
    background-color: #d1d4d8;
    clip-path: ${clipPath};
    cursor: pointer;
    
    img {
        display: block;
        clip-path: ${clipPath};
    }
`

export default Thumbnail;