import React from "react";
import styled from "styled-components";
import * as lightbox from "basiclightbox";
import { snapPts, dropShadow } from "../util/mixins";

const images = require.context("../img");

const createTextLayer = (text) => {
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
			hlink.onclick = (e) => e.stopPropagation();

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

const openLightbox = (info) => {
	let mainDiv = document.createElement("div");
	mainDiv.style.cssText =
		"display: flex; flex-direction: column; align-items: center; max-height: 100vh; overflow-y: auto;";

	let imgContainer = document.createElement("div");
	imgContainer.style.cssText = "position: relative; margin: 1vmin;";

	let closeBtn = document.createElement("img");
	closeBtn.style.cssText =
		"position: absolute; top: 1vmin; right: 1vmin; width: 40px; filter: drop-shadow(3px 3px 5px black)";
	closeBtn.src = images("./close-btn.svg");
	imgContainer.appendChild(closeBtn);

	let mainImg = document.createElement("img");
	mainImg.style.cssText = "max-width: 95vw;";
	mainImg.src = images(info.imgSrc);

	imgContainer.appendChild(mainImg);
	mainDiv.appendChild(imgContainer);

	if (info.text) {
		const txtDiv = createTextLayer(info.text);
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

const thumb = (props) => {
	const gitHub = props.info.text.gitHub && props.info.text.gitHub.url;

	return (
		<div className={props.className}>
			<img src={props.tSrc} alt="" onClick={openLightbox.bind(null, props.info)} />
			{gitHub && (
				<a href={gitHub} className="github-thumb-link" target="_blank" rel="noopener noreferrer">
					GitHub
				</a>
			)}
		</div>
	);
};

const clipPath = `polygon(0 0, calc(100% - 30px) 0, 100% 100%, 30px 100%)`;

const Thumbnail = styled(thumb)`
	position: relative;
	margin: 0 0 30px;
	padding: 2px;
	background-color: #d1d4d8;
	clip-path: ${clipPath};
	cursor: pointer;

	img {
		display: block;
		clip-path: ${clipPath};
	}

	a.github-thumb-link {
		position: absolute;
		bottom: 0;
		right: 0;
		padding: 1em 1em 1em 2em;
		background-image: url(${images("./github-bg.png")});
		background-repeat: no-repeat;
		background-position: 0% 41%;
		color: black;
		font-family: sans-serif;
		font-size: 0.85em;
		font-weight: bold;
		text-decoration: none;
		${dropShadow}
		transition: padding 0.2s;

		&:hover {
			padding-right: 2em;
		}
	}

	@media (${snapPts.maxSmall}) {
		clip-path: none;

		img {
			max-width: 90vw;
			clip-path: none;
		}
	}
`;

export default Thumbnail;
