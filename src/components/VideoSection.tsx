import styled from "styled-components";
import Section from "./Section";
import pageData from "../data/pageData.json";

const vProps = {
  w: 640,
  h: 360,
};

const VidWrapper = styled.div`
  text-align: center;
`;

const Vid = styled.div`
  margin: 0 0 40px;

  iframe {
    width: 90vw;
    max-width: ${`${vProps.w}px`};
    max-height: 45vw;
  }
`;

const VideoContent = () => {
  const videos = pageData.pages.video.content || [];
  let vidId = 0;

  return (
    <VidWrapper>
      {videos.map((vidData) => (
        <Vid key={vidId++}>
          <iframe
            title={vidData.title}
            src={vidData.src}
            width={vProps.w}
            height={vProps.h}
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
          ></iframe>
        </Vid>
      ))}
    </VidWrapper>
  );
};

const VideoSection = () => {
  return (
    <Section path={pageData.pages.video.path} title="Video (just for fun)">
      <VideoContent />
    </Section>
  );
};

export default VideoSection;
