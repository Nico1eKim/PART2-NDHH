import Modal from "@/components/commons/modal/Modal";
import ModalFrame from "@/components/commons/modal/ModalFrame";
import ModalPortal from "@/components/commons/modal/ModalPortal";
import Card from "@/components/post/Card";
import useModal from "@/hooks/useModal";
import { DeviceSize } from "@/styles/DeviceSize";
import { useState } from "react";
import styled from "styled-components";

function CardGrid({ path, messageCount, recentMessages, setDelList }) {
  const { isOpen, handleModalOpen, handleModalClose } = useModal();
  const [message, setMessage] = useState("");

  const handleCardClick = (msg) => {
    setMessage(msg);
    handleModalOpen();
  };

  return (
    <Wrapper>
      {path !== "edit" && <Card type="Plus" />}
      {messageCount !== 0 && recentMessages.map((msg) => <Card key={msg.id} type={path === "edit" ? "Edit" : "Normal"} data={msg} onCardClick={handleCardClick} setDelList={setDelList} />)}
      {isOpen && (
        <ModalPortal>
          <ModalFrame onClickClose={handleModalClose}>
            <Modal message={message} onClose={handleModalClose} />
          </ModalFrame>
        </ModalPortal>
      )}
    </Wrapper>
  );
}

export default CardGrid;

const Wrapper = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(3, minmax(30rem, 38.4rem));
  justify-content: space-between;
  row-gap: 2.8rem;
  column-gap: 2.4rem;
  column-gap: min(1.6rem);

  @media (max-width: ${DeviceSize.tablet}) {
    grid-template-columns: repeat(2, minmax(30rem, 50rem));
    gap: 1.6rem;
  }

  @media (max-width: ${DeviceSize.mobile}) {
    grid-template-columns: repeat(1, minmax(30rem, 38.4rem));
  }
`;
