import React from "react";
import styled from "styled-components";
import * as lightbox from "basiclightbox";

const images = require.context('../img');

const thumb = (props) => {

    const createTextDiv = text => {
        let txtDiv = document.createElement("div");
        txtDiv.style.cssText =
            "display: flex; flex-direction: column; justify-content: center; align-items: stretch; flex: 1; padding: 0 2%; background-color: #000000ee; color: white; font-family: sans-serif;";
        
        if (text.header) {
            let head = document.createElement("h2");
            head.style.cssText = "text-align: center;";
            head.textContent = text.header;
            txtDiv.appendChild(head);
        }

        if (text.paragraphs && text.paragraphs.length) {
            text.paragraphs.forEach((par) => {
                let parNode = document.createElement("p");
                parNode.textContent = par;
                txtDiv.appendChild(parNode);
            });
        }

        if (text.gitHub) {
            if (text.gitHub.url) {
                let hlink = document.createElement("a");
                hlink.style.cssText = "text-transform: none; color: #8db2e6";
                hlink.href = text.gitHub.url;
                hlink.target = "_blank";
                hlink.textContent = text.gitHub.text || text.gitHub.url;
                
                // Prevent click on href from closing entire description
                hlink.onclick = e => e.stopPropagation();
                
                let hlinkPara = document.createElement("p");
                hlinkPara.appendChild(hlink);
                txtDiv.appendChild(hlinkPara);
            }
        }

        let txtWrapperDiv = document.createElement("div");
        txtWrapperDiv.style.cssText = "position: absolute; top: 0; right: 0; bottom: 0; left: 0; display: flex; justify-content: center; align-items: center; background-color: transparent; transition: opacity 0.5s";
        txtWrapperDiv.appendChild(txtDiv);

        txtWrapperDiv.onclick = (e) => {
            e.stopPropagation();
            txtWrapperDiv.style.cssText += " opacity: 0; pointer-events: none";
        };

        return txtWrapperDiv;
    }

	const openLightbox = info => {
		// lightbox.create(`<img src=${lSrc} alt="">`).show();

        let mainDiv = document.createElement("div");
		mainDiv.style.cssText = "position: relative";

		let mainImg = document.createElement("img");
        mainImg.src = images(info.imgSrc);
        
        mainDiv.appendChild(mainImg);

		if (info.text) {
			const txtDiv = createTextDiv(info.text)
            mainDiv.appendChild(txtDiv);
        }
        
        // Extra wrapper div required to get around the way basiclightbox handles events
        let mainWrapperDiv = document.createElement("div");
        mainWrapperDiv.appendChild(mainDiv);

		let lb = lightbox.create(mainWrapperDiv);
		lb.show();

		mainImg.onclick = () => { lb.close(); };
        mainDiv.onclick = () => { lb.close(); }
	};

	return (
		<div className={props.className}>
			<img src={props.tSrc} alt="" onClick={openLightbox.bind(null, props.info)} />
		</div>
	);
};

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
`;

export default Thumbnail;