import styled from "styled-components";
import PropTypes from "prop-types";
import { FONT16, FONT12 } from "@/styles/FontStyles";

Input.propTypes = {
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

function Input({ placeholder, disabled, pwError, inputRef, ...props }) {
  return (
    <>
      <Container ref={inputRef} $error={pwError} placeholder={placeholder} disabled={disabled} {...props} />
      {pwError === "true" && <ErrorMessage>값을 입력해 주세요.</ErrorMessage>}
      {pwError === true && <ErrorMessage>비밀번호를 다시 입력해 주세요.</ErrorMessage>}
    </>
  );
}

export default Input;

const Container = styled.input`
  width: 100%;
  padding: 1.2rem 1.6rem;
  border-radius: 0.8rem;
  border: none;
  outline: 0.1rem solid var(--Gray3);
  background: var(--White);
  ${FONT16}

  &:hover {
    outline: 0.1rem solid var(--Gray5);
  }

  &:focus {
    outline: 0.2rem solid var(--Gray5);
  }

  &:active {
    outline: 0.2rem solid var(--Gray7);
  }

  &:disabled {
    border: 0.1rem solid var(--Gray3);
    background: var(--Gray1);
    color: var(--Gray4);
  }

  ${({ $error }) =>
    $error &&
    `
    border: 0.1rem solid var(--Error2);
    
    &:hover {
      outline: 0.1rem solid var(--Error2);
    }
    &:focus {
      outline: 0.2rem solid var(--Error2);
    }
    &:active {
      outline: 0.2rem solid var(--Error2);
    }
  `}
`;

const ErrorMessage = styled.div`
  width: 32rem;
  height: 1.8rem;
  margin-top: 0.4rem;

  color: var(--Error2);
  ${FONT12}
`;
