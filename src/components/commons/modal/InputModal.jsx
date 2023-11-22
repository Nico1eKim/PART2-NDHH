import { FONT18B } from "@/styles/FontStyles";
import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../Button";
import Input from "../Input";

function InputModal({ password, onClose }) {
  const [pwError, setPwError] = useState(false);
  const { id } = useParams();
  const inputRef = useRef();
  const navigate = useNavigate();

  const handlePasswordCheck = (event) => {
    event.preventDefault();
    const inputValue = inputRef.current.value;
    if (!inputValue) {
      setPwError("true");
      return;
    }
    if (inputValue == import.meta.env.VITE_EDIT_KEY || inputValue == password) {
      setPwError(false);
      onClose();
      sessionStorage.setItem("editToken", id);
      return navigate(`/post/${id}/edit`);
    }
    setPwError(true);
  };

  return (
    <Container onSubmit={handlePasswordCheck}>
      <Text>🔐 비밀번호를 입력하세요.</Text>
      <InputWrapper>
        <Input autoFocus placeholder="●●●●" pwError={pwError} inputRef={inputRef} />
      </InputWrapper>
      <Button width="100" height="l" type="primary">
        확인
      </Button>
    </Container>
  );
}

export default InputModal;

const Container = styled.form`
  width: 36rem;
  padding: 4rem 4rem 3rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.4rem;

  background-color: white;
  border-radius: 15px;
  border: 1px solid var(--GRAY2);
`;
const Text = styled.div`
  ${FONT18B}
`;
const InputWrapper = styled.div`
  width: 100%;
`;
