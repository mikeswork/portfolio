import React from "react";
import styled from "styled-components";
import * as lightbox from "basiclightbox";

const images = require.context("../img");

const thumb = (props) => {
	const createText = (text) => {
		let txtDiv = document.createElement("div");
		txtDiv.style.cssText =
			"padding: 1px 25px 15px; background-color: #000102; text-align: left; color: #d8d8d8; font-family: sans-serif;";

		if (text.header) {
			let head = document.createElement("h2");
			head.style.cssText = "text-align: center; text-transform: uppercase";
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
		txtWrapperDiv.style.cssText = "background-color: transparent; transition: opacity 0.5s";
		txtWrapperDiv.appendChild(txtDiv);

		// txtWrapperDiv.onclick = (e) => {
		//     e.stopPropagation();
		//     txtWrapperDiv.style.cssText += " opacity: 0; pointer-events: none";
		// };

		return txtWrapperDiv;
	};

	const openLightbox = info => {
		let mainDiv = document.createElement("div");
		mainDiv.style.cssText = "max-height: 100vh; overflow-y: auto; text-align: center;";

		let mainImg = document.createElement("img");
		mainImg.src = images(info.imgSrc);
		mainImg.style.cssText = "max-width: 95vw; margin: 1vmin;";

		mainDiv.appendChild(mainImg);

		if (info.text) {
			const txtDiv = createText(info.text);
			mainDiv.appendChild(txtDiv);
		}

		// Extra wrapper div required to get around the way basiclightbox handles events
		let mainWrapperDiv = document.createElement("div");
		mainWrapperDiv.appendChild(mainDiv);

		let lb = lightbox.create(mainWrapperDiv, {
			onShow: () => {
                document.body.style.overflow = "hidden";
                document.body.style.paddingRight = "15px";
			},
			onClose: () => {
                document.body.style.overflow = "auto";
                document.body.style.paddingRight = "0";
			},
        });
        
		lb.show();

		mainDiv.onclick = () => {
			lb.close();
		};
	};

	return (
		<div className={props.className}>
			<img src={props.tSrc} alt="" onClick={openLightbox.bind(null, props.info)} />
		</div>
	);
};

const clipPath = `polygon(0 0, calc(100% - 40px) 0, 100% 100%, 40px 100%)`;

const Thumbnail = styled(thumb)`
	margin: 0 0 40px;
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
