import styled from "styled-components";
import * as lightbox from "basiclightbox";
import { snapPts, dropShadow } from "../util/mixins";
import closeBtnSvg from "../img/close-btn.svg";
import githubBgPng from "../img/github-bg.png";
import externalBgPng from "../img/external-bg.png";
import { images } from "../util/helpers";
import { createRoot } from "react-dom/client";
import LoadingIndicator from "./LoadingIndicator";

interface GitHub {
  url: string;
  text?: string;
}

interface External {
  url: string;
  text?: string;
}

interface Text {
  header?: string;
  paragraphs?: string[];
  gitHub?: GitHub;
  external?: External;
}

interface Info {
  imgSrc: string;
  text?: Text;
}

interface Props {
  tSrc: string;
  info: Info;
  className?: string;
}

const createTextLayer = (text: Text) => {
  const txtDiv = document.createElement("div");
  txtDiv.style.cssText =
    "padding: 1px 25px 15px; background-color: #000102; text-align: left; color: #d8d8d8; font-family: sans-serif; max-width: 900px;";

  if (text.header) {
    const head = document.createElement("h2");
    head.style.cssText = "text-transform: uppercase";
    head.textContent = text.header;
    txtDiv.appendChild(head);
  }

  if (text.paragraphs && text.paragraphs.length) {
    text.paragraphs.forEach((par: string) => {
      const parNode = document.createElement("p");
      parNode.textContent = par;
      txtDiv.appendChild(parNode);
    });
  }

  if (text.external?.url) {
    const elink = document.createElement("a");
    elink.style.cssText = "text-transform: none; color: #8db2e6";
    elink.href = text.external.url;
    elink.target = "_blank";
    elink.textContent = text.external.text || "External Link";

    // Prevent click on href from closing entire description
    elink.onclick = (e) => e.stopPropagation();

    const elinkPara = document.createElement("p");
    elinkPara.appendChild(elink);
    txtDiv.appendChild(elinkPara);
  }

  if (text.gitHub?.url) {
    const hlink = document.createElement("a");
    hlink.style.cssText = "text-transform: none; color: #8db2e6";
    hlink.href = text.gitHub.url;
    hlink.target = "_blank";
    hlink.textContent = text.gitHub.text || text.gitHub.url;

    // Prevent click on href from closing entire description
    hlink.onclick = (e) => e.stopPropagation();

    const hlinkPara = document.createElement("p");
    hlinkPara.appendChild(hlink);
    txtDiv.appendChild(hlinkPara);
  }

  const txtWrapperDiv = document.createElement("div");
  txtWrapperDiv.style.cssText =
    "background-color: transparent; transition: opacity 0.5s";
  txtWrapperDiv.appendChild(txtDiv);

  // txtWrapperDiv.onclick = (e) => {
  //     e.stopPropagation();
  //     txtWrapperDiv.style.cssText += " opacity: 0; pointer-events: none";
  // };

  return txtWrapperDiv;
};

const openLightbox = (info: Info) => {
  const mainDiv = document.createElement("div");
  mainDiv.style.cssText =
    "display: flex; flex-direction: column; align-items: center; max-height: 100vh; overflow-y: auto;";

  const imgContainer = document.createElement("div");
  imgContainer.style.cssText =
    "position: relative; margin: 1vmin; min-width: 300px; min-height: 200px;";

  const mainImg = document.createElement("img");
  mainImg.style.cssText =
    "max-width: 95vw; cursor: pointer; visibility: hidden;";

  // container for mounting the React LoadingIndicator
  const loaderContainer = document.createElement("div");
  loaderContainer.style.cssText =
    "position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); display: flex; align-items: center; justify-content: center;";

  const closeBtn = document.createElement("img");
  closeBtn.style.cssText =
    "position: absolute; top: 1vmin; right: 1vmin; width: 30px; filter: drop-shadow(3px 3px 5px black); cursor: pointer; z-index: 1;";
  closeBtn.src = closeBtnSvg;

  imgContainer.appendChild(mainImg);
  imgContainer.appendChild(loaderContainer);
  imgContainer.appendChild(closeBtn);

  // mount the React LoadingIndicator into the loader container
  let loaderRoot: ReturnType<typeof createRoot> | null = null;
  try {
    loaderRoot = createRoot(loaderContainer);
    loaderRoot.render(<LoadingIndicator />);
  } catch {
    // fallback: show text if mounting fails
    loaderContainer.textContent = "Loading...";
  }

  // show image and unmount loader when finished
  mainImg.onload = () => {
    if (loaderRoot) loaderRoot.unmount();
    loaderContainer.remove();
    mainImg.style.visibility = "visible";
  };

  mainImg.onerror = () => {
    if (loaderRoot) loaderRoot.unmount();
    loaderContainer.textContent = "Failed to load image";
    loaderContainer.style.color = "#d8d8d8";
  };

  // set the src after handlers are attached so loader is visible while downloading
  mainImg.src = images(info.imgSrc);

  mainDiv.appendChild(imgContainer);

  if (info.text) {
    const txtDiv = createTextLayer(info.text);
    mainDiv.appendChild(txtDiv);
  }

  // Extra wrapper div required to get around the way basiclightbox handles events
  const mainWrapperDiv = document.createElement("div");
  mainWrapperDiv.appendChild(mainDiv);

  const lb = lightbox.create(mainWrapperDiv, {
    onShow: () => {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "15px";
      return true;
    },
    onClose: () => {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0";
      return true;
    },
  });

  lb.show();

  mainDiv.onclick = () => {
    lb.close();
  };
};

const thumb = (props: Props) => {
  const gitHub = props.info.text?.gitHub?.url;
  const external = props.info.text?.external?.url;

  return (
    <div className={props.className}>
      <img
        src={props.tSrc}
        alt=""
        onClick={openLightbox.bind(null, props.info)}
      />
      <div className={`thumb-link-overlay${gitHub ? " has-github" : ""}`}>
        {external && (
          <a
            href={external}
            className="external-thumb-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            External Link
          </a>
        )}
        {gitHub && (
          <a
            href={gitHub}
            className="github-thumb-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        )}
      </div>
    </div>
  );
};

const clipPath = `polygon(0 0, calc(100% - 30px) 0, 100% 100%, 30px 100%)`;

const Thumbnail = styled(thumb)`
  position: relative;
  margin: 0 0 30px;
  padding: 2px;
  min-width: 300px;
  min-height: 200px;
  background-color: #d1d4d8;
  clip-path: ${clipPath};
  cursor: pointer;

  img {
    display: block;
    clip-path: ${clipPath};
  }

  .thumb-link-overlay {
    position: absolute;
    bottom: 0;
    right: 0;
    pointer-events: none;
  }

  .external-thumb-link,
  .github-thumb-link {
    padding: 1em 1em 1em 2em;
    background-image: url(${githubBgPng});
    background-repeat: no-repeat;
    background-position: 0% 41%;
    color: black;
    font-family: sans-serif;
    font-size: 0.85em;
    font-weight: bold;
    text-decoration: none;
    ${dropShadow}
    transition: padding 0.2s;
    pointer-events: auto;
    display: inline-block;
    white-space: nowrap;
  }

  .external-thumb-link {
    position: absolute;
    background-image: url(${externalBgPng});
  }

  .github-thumb-link {
    background-image: url(${githubBgPng});
  }

  .thumb-link-overlay.has-github .external-thumb-link {
    bottom: 100%;
    right: 0;
  }

  .thumb-link-overlay:not(.has-github) .external-thumb-link {
    bottom: 0;
    right: 0;
  }

  .github-thumb-link {
    position: relative;
  }

  .external-thumb-link:hover,
  .github-thumb-link:hover {
    padding-right: 2em;
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
