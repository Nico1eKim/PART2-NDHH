import Button from "@/components/commons/Button";
import Input from "@/components/commons/Input";
import usePostData from "@/hooks/usePostData";
import { DeviceSize } from "@/styles/DeviceSize";
import { FONT24B } from "@/styles/FontStyles";
import { PropTypes } from "prop-types";
import { styled } from "styled-components";

const CONTENTS = {
  create: {
    p: "수신인.",
    input: "받는 사람 이름을 입력해 주세요.",
  },
  message: {
    p: "발신인.",
    input: "보내는 이름을 입력해 주세요.",
  },
};

Title.propTypes = {
  message: PropTypes.bool,
  value: PropTypes.string,
  setValue: PropTypes.func,
};
export function Title({ message, value, setValue }) {
  const handleChange = (event) => {
    const txt = event.target.value;
    if (message) {
      const sender = txt;
      setValue((prev) => ({
        ...prev,
        sender,
      }));
      return;
    }
    const name = txt;
    setValue((prev) => ({
      ...prev,
      name,
    }));
  };

  return (
    <Contents__title>
      <p>{message ? CONTENTS.message.p : CONTENTS.create.p}</p>
      <Input value={value} onChange={handleChange} placeholder={message ? CONTENTS.message.input : CONTENTS.create.input} />
    </Contents__title>
  );
}

export function Submit({ value }) {
  const [pending, error, handleSubmit] = usePostData(value);

  return (
    <Contents__title>
      <Button disabled={pending} type={error ? `error` : `primary`} height="xl" onClick={handleSubmit}>
        {error ? error.message : `보내기`}
      </Button>
    </Contents__title>
  );
}

export const Container = styled.div`
  width: calc(100vw - 9.6rem);
  max-width: 120rem;

  margin: 5rem auto;

  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 5rem;

  @media (max-width: ${DeviceSize.tablet}) {
    width: calc(100vw - 9.6rem);
    margin-bottom: 5rem;
  }

  @media (max-width: ${DeviceSize.mobile}) {
    width: calc(100vw - 9.6rem);
    min-width: 32rem;
    margin-bottom: 5rem;
  }
`;

const Contents__title = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  > p {
    ${FONT24B}
  }
`;
