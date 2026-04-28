import styled from "styled-components";

interface EmailProps {
  className?: string;
  visible?: boolean;
  margin?: string;
}

const email = ({ className }: EmailProps) => {
  return (
    <div className={className}>
      <a href="mailto:contact@mikeswork.info">mailto:</a>{" "}
      <span className="address">contact@mikeswork.info</span>
    </div>
  );
};

const Email = styled(email).attrs<EmailProps>(({ visible = true, margin }) => ({
  visible,
  margin: margin ? `margin: ${margin}` : `margin: 0`,
}))`
  ${(props) => props.margin};
  text-align: center;
  text-transform: none;
  font-size: 1.4em;

  ${(props) => !props.visible && `display: none;`}

  & > * {
    padding: 0.1em 0.5em 0;
  }

  a {
    background-color: #ffffff70;
    color: black;
    text-transform: none;
  }

  .address {
    background-color: #000000aa;
  }
`;

export default Email;
