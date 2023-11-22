import api from "@/api/api";
import { FONT14, FONT20B } from "@/styles/FontStyles";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../Button";

function DeleteModal({ name, onClose }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const handlePostDelete = async (event) => {
    event.preventDefault();

    const res = await api("RECIPIENTS_ID", "DELETE", id * 1);
    if (res) {
      onClose();
      return navigate("/list");
    }
  };

  return (
    <Container onSubmit={handlePostDelete}>
      <Wrapper>
        <Text>삭제하시겠습니까?</Text>
        <Content>{name} 의 롤링페이퍼</Content>
      </Wrapper>
      <Button autoFocus width="100" height="l" type="error">
        확인
      </Button>
    </Container>
  );
}

export default DeleteModal;

const Container = styled.form`
  width: 36rem;
  padding: 4rem 4rem 3rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;

  background-color: white;
  border-radius: 15px;
  border: 1px solid var(--GRAY2);
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;
const Text = styled.div`
  ${FONT20B}
`;
const Content = styled.div`
  ${FONT14}
  color : var(--Gray5);
`;
