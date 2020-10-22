import React from "react";
import styled from "styled-components";
import Section from "./Section";
import pageData from "../data/pageData.json";

const VidWrapper = styled.div`
	text-align: center;
`;

const Vid = styled.div`
	margin: 0 0 40px;

	iframe {
		width: 80vw;
		max-width: 560px;
	}
`;

const VideoContent = (props) => {
	const videos = pageData.pages.video.content || [];
	let vidId = 0;

	return (
		<VidWrapper>
			{videos.map((vidData) => (
				<Vid key={vidId++}>
					<iframe
						title={vidData.title}
						src={vidData.src}
						width="560"
						height="315"
						frameBorder="0"
						allow={
							vidData.src.indexOf("youtube") === -1
								? "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								: "autoplay; fullscreen"
						}
						allowFullScreen
					></iframe>
				</Vid>
			))}
		</VidWrapper>
	);
};

const VideoSection = (props) => {
	return (
		<Section path={pageData.pages.video.path} title="Video (just for fun)">
			<VideoContent />
		</Section>
	);
};

export default VideoSection;
