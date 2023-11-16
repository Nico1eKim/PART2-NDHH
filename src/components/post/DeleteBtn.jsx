import styled from "styled-components";
import Button from "@/components/commons/Button";
import ModalPortal from "@/components/ModalPortal";
import ModalFrame from "@/components/ModalFrame";
import DeleteModal from "@/components/DeleteModal";
import useModal from "@/hooks/useModal";
import { DeviceSize } from "@/styles/DeviceSize";
import { Z_INDEX } from "@/styles/ZindexStyles";

function DeleteBtn({ name }) {
  const { isOpen, handleModalOpen, handleModalClose } = useModal();

  return (
    <>
      <Wrapper>
        <Button type="error" height="l" width="150" onClick={handleModalOpen}>
          페이지 삭제하기
        </Button>
      </Wrapper>
      {isOpen && (
        <ModalPortal>
          <ModalFrame onClickClose={handleModalClose}>
            <DeleteModal name={name} onClose={handleModalClose} />
          </ModalFrame>
        </ModalPortal>
      )}
    </>
  );
}

export default DeleteBtn;

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
