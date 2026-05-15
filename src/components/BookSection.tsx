import { useRef, useState } from "react";
import styled from "styled-components";
import Section from "./Section";
import pageData from "../data/pageData.json";

const VidWrapper = styled.div`
  text-align: center;
`;

const Vid = styled.video<{ openMode: boolean }>`
  width: clamp(200px, 90vw, 622px);
  cursor: ${(props) => (props.openMode ? "zoom-in" : "pointer")};

  transition: 3s all;
  &:hover {
    transform: scale(1.1);
  }
`;

type BookItem = {
  videoFile?: string;
  link?: string;
};

const BookContent = () => {
  const vidRef = useRef<HTMLVideoElement>(null);
  const [openMode, setOpenMode] = useState(false);
  const bookContent = pageData.pages.book.content as BookItem | undefined;
  const src = bookContent?.videoFile
    ? new URL(`../vid/${bookContent.videoFile}`, import.meta.url).href
    : "";

  const handleClick = () => {
    if (!bookContent?.link) return;

    if (!openMode) {
      if (!vidRef.current) return;
      vidRef.current.currentTime = 0;
      vidRef.current.play();
      setOpenMode(true);
      return;
    }

    window.open(bookContent.link, "_blank", "noopener,noreferrer");
    setOpenMode(false);
  };

  return (
    <VidWrapper>
      {src && (
        <Vid
          src={src}
          muted
          playsInline
          ref={vidRef}
          onClick={handleClick}
          openMode={openMode}
        />
      )}
    </VidWrapper>
  );
};

const BookSection = () => {
  return (
    <Section path={pageData.pages.book.path} title="Book" style="black">
      <BookContent />
    </Section>
  );
};

export default BookSection;
