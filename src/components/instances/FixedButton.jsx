import Button from "@/components/commons/Button.jsx";
import styled from "styled-components";
import { DeviceSize } from "@/styles/DeviceSize.js";
import { useNavigate } from "react-router-dom";

function FixedButton({ children, link }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(link);
  };

  return (
    <Container onClick={handleClick}>
      <Button type="primary" height="xl">
        {children}
      </Button>
    </Container>
  );
}

export default FixedButton;

const Container = styled.div`
  width: 28rem;

  position: fixed;
  bottom: 4rem;
  left: 50%;
  transform: translateX(-50%);

  @media (max-width: ${DeviceSize.pc}) {
    width: calc(100vw - 4.9rem);
    bottom: 2.4rem;
  }

  @media (max-width: ${DeviceSize.mobile}) {
    width: calc(100vw - 4.9rem);
    bottom: 2.4rem;
  }
`;
