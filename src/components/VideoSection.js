import React from "react";
import styled from "styled-components";
import Section from "./Section";
import pageData from "../data/pageData.json";

const VidWrapper = styled.div`
	text-align: center;
`;

const Vid = styled.div`
    margin: 40px;
    
    iframe {
        width: 80vw;
        max-width: 560px;
    }
`;

const VideoContent = props => {
	return (
		<VidWrapper>
			<Vid>
				<iframe
					src="https://player.vimeo.com/video/302378063"
					width="560"
					height="315"
					frameBorder="0"
					allow="autoplay; fullscreen"
					allowFullScreen
				></iframe>
			</Vid>

			<Vid>
				<iframe
					width="560"
					height="315"
					src="https://www.youtube.com/embed/BuudPA9UPsg"
					frameBorder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
				></iframe>
			</Vid>

			<Vid>
				<iframe
					width="560"
					height="315"
					src="https://www.youtube.com/embed/0iA0aykvtgo"
					frameBorder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
				></iframe>
			</Vid>
		</VidWrapper>
	);
};

const VideoSection = (props) => {
	return (
		<Section path={pageData.pages.video.path} title="Video (just for fun)" className={props.className}>
			<VideoContent />
		</Section>
	);
};

export default VideoSection;
