import styled, { keyframes } from "styled-components";

const dot = (props: { className?: string; delay: string }) => {
  return <span className={props.className}> . </span>;
};

const showDots = keyframes`
    0% { opacity: 0; }
    49% { opacity: 0; }
    50% { opacity: 1; }
`;

const Dot = styled(dot)`
  animation-name: ${showDots};
  animation-duration: 1.2s;
  animation-iteration-count: infinite;
  animation-delay: ${(props) => props.delay || `0s`};
`;

const Container = styled("div")`
  color: white;
  padding: 40px 10px;
`;

const Indicator = () => {
  return (
    <Container>
      <Dot delay="0.3s" />
      <Dot delay="0.2s" />
      <Dot delay="0.1s" />

      <span>Loading</span>

      <Dot delay="0.1s" />
      <Dot delay="0.2s" />
      <Dot delay="0.3s" />
    </Container>
  );
};

export default Indicator;
