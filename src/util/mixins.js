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
        1% {
            transform: translateY(${distance});
        }
        4% {
            transform: translateY(0)
        }
    `;

    return css`
        animation-name: ${twitch};
        animation-delay: ${delay};
        animation-duration: 8s;
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
    maxSmall: 'max-width: 700px',
    minMed: 'min-width: 930px',
    maxMed: 'max-width: 930px',
    maxLarge: 'max-width: 1400px'
}