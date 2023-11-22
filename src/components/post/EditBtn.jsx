import Button from "@/components/commons/Button";
import InputModal from "@/components/commons/modal/InputModal";
import ModalFrame from "@/components/commons/modal/ModalFrame";
import ModalPortal from "@/components/commons/modal/ModalPortal";
import useModal from "@/hooks/useModal";
import { DeviceSize } from "@/styles/DeviceSize";
import { Z_INDEX } from "@/styles/ZindexStyles";
import { useState } from "react";
import styled from "styled-components";

function EditBtn({ password }) {
  const { isOpen, handleModalOpen, handleModalClose } = useModal();
  const [button, setButton] = useState();

  const handleOpen = (event) => {
    setButton(event.target);
    handleModalOpen();
  };

  const handleClose = () => {
    button.focus();
    handleModalClose();
  };

  return (
    <>
      <Wrapper>
        <Button type="outlined" height="l" width="100" onClick={handleOpen}>
          편집하기
        </Button>
      </Wrapper>
      {isOpen && (
        <ModalPortal>
          <ModalFrame onClickClose={handleClose}>
            <InputModal password={password} onClose={handleModalClose} />
          </ModalFrame>
        </ModalPortal>
      )}
    </>
  );
}

export default EditBtn;

const Wrapper = styled.div`
  padding-bottom: 1.1rem;

  position: relative;

  z-index: ${Z_INDEX.postLayout_EditWrapper};

  @media (max-width: ${DeviceSize.tablet}) {
    padding-bottom: 1.4rem;
  }

  @media (max-width: ${DeviceSize.mobile}) {
    padding-bottom: 1.6rem;
  }
`;
