import useNotScroll from "@/hooks/useNotScroll";
import { Z_INDEX } from "@/styles/ZindexStyles";
import styled from "styled-components";

function ModalFrame({ children, onClickClose }) {
  useNotScroll();

  return (
    <>
      <Mask tabIndex={0} onClick={onClickClose} onFocus={onClickClose} />
      <Body>{children}</Body>
    </>
  );
}

export default ModalFrame;

const Mask = styled.div`
  width: 100%;
  height: 100%;

  position: fixed;
  top: 0;
  left: 0;
  z-index: ${Z_INDEX.modalFrame_Mask};

  background-color: black;
  opacity: 0.4;
`;
const Body = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: ${Z_INDEX.modalFrame_Body};
`;
