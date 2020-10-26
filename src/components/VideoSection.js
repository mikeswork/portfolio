import React from "react";
import styled from "styled-components";
import Section from "./Section";
import pageData from "../data/pageData.json";

const vProps = {
    w: 640,
    h: 360
}

const VidWrapper = styled.div`
	text-align: center;
`;

const Vid = styled.div`
	margin: 0 0 40px;

	iframe {
		width: 90vw;
		max-width: ${`${vProps.w}px`};
        max-height: 45vw;
        ${props => props.$vimeo && `max-height: 51vw;`}
	}
`;

const VideoContent = (props) => {
	const videos = pageData.pages.video.content || [];
	let vidId = 0;

	return (
		<VidWrapper>
			{videos.map((vidData) => {
				const isVimeo = vidData.src.indexOf("youtube") === -1;

				return (
					<Vid key={vidId++} $vimeo={isVimeo}>
						<iframe
							title={vidData.title}
							src={isVimeo ? `${vidData.src}?transparent=0` : vidData.src}
							width={vProps.w}
							height={vProps.h}
							frameBorder="0"
							allow={
								isVimeo
									? "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									: "autoplay; fullscreen"
							}
							allowFullScreen
						></iframe>
					</Vid>
				);
			})}
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
