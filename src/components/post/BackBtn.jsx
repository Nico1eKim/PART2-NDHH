import { useNavigate } from "react-router";
import arrowWhite from "@/assets/backarrow_white.svg";
import arrowBlack from "@/assets/backarrow_black.svg";
import styled, { keyframes } from "styled-components";

function BackBtn({ URL }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/list");
  };

  return (
    <Container_button onClick={handleClick}>
      <img src={URL ? arrowWhite : arrowBlack} />
    </Container_button>
  );
}

export default BackBtn;

const back = keyframes`
  50% {
    padding-left: 1.6rem;
  }
`;

const Container_button = styled.button`
  padding-bottom: 0.4rem;

  display: flex;
  justify-content: center;
  align-items: end;

  position: absolute;
  top: 6.8rem;
  left: 0;

  animation: ${back} 2s 0.5s infinite;

  @media (max-width: 1248px) {
    left: 2.4rem;
  }

  img {
    width: 10rem;
    height: auto;
  }
`;
