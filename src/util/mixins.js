import { keyframes, css } from 'styled-components';

export function abs(center = false) {
    return css`
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;

        ${center && `margin: auto;`}
    `
}

export function dropShadow() {
    return `
        filter: drop-shadow(3px 3px 5px #00000070);
    `
}

export function twitchDown(delay = `0s`, distance = `25px`) {
    const twitch = keyframes`
        2% {
            transform: translateY(${distance});
        }
        7% {
            transform: translateY(0)
        }
    `;

    return css`
        animation-name: ${twitch};
        animation-delay: ${delay};
        animation-duration: 4s;
        animation-iteration-count: infinite;
        animation-timing-function: ease-in-out;
    `
}

export function letterSpace() {
    return `
        letter-spacing: 0.08em;
    `
}

export const snapPts = {
    minMed: 'min-width: 930px',
    maxMed: 'max-width: 930px',
    maxBig: 'max-width: 1700px'
}