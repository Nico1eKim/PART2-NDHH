import CHECKIMG from "@/assets/check.svg";
import PLUSIMG from "@/assets/plus_icon.svg";
import Button from "@/components/commons/Button";
import Input from "@/components/commons/Input";
import ModalFrame from "@/components/commons/modal/ModalFrame";
import ModalPortal from "@/components/commons/modal/ModalPortal";
import useModal from "@/hooks/useModal";
import { DeviceSize } from "@/styles/DeviceSize";
import { FONT14, FONT14B, FONT18B } from "@/styles/FontStyles";
import { getURL } from "@/utils/getURL";
import PropTypes from "prop-types";
import { useRef } from "react";
import styled, { css } from "styled-components";

Option.propTypes = {
  color: PropTypes.oneOf(["beige", "purple", "blue", "green", "red"]),
  src: PropTypes.string,
  check: PropTypes.bool,
};
function Option({ color, ...props }) {
  if (color) {
    return <OptionColor color={color} {...props} />;
  }
  if (!color) {
    return <OptionImg {...props} />;
  }
}

function OptionColor({ color, check, ...props }) {
  const COLOR =
    color &&
    css`
      background-color: var(--${color}2);
    `;
  return (
    <Container color={COLOR} $check={check} {...props}>
      {check && (
        <div>
          <img src={CHECKIMG} alt="선택된 색깔" />
        </div>
      )}
    </Container>
  );
}

const REG = /^http[s]?:\/\/([\S]{3,})/i;

function OptionImg({ check, value, setValue, img, setImgs, setSelected, ...props }) {
  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file && file.size < 1024 ** 2 * 3) {
      (async function (file) {
        const URL = await getURL(file);
        console.log(URL);
        setSelected(0);
        setImgs((prev) => [URL, ...prev]);
        setValue((prev) => ({ ...prev, URL }));
      })(file);
    }
  };

  const handleSubmit = (handleModalClose) => (ref) => (event) => {
    event.preventDefault();
    const URL = ref.current.value;
    if (!REG.test(URL)) {
      return setValue((prev) => ({ ...prev, error: "정확한 URL 주소를 입력해주세요" }));
    }
    if (URL.length > 200) {
      return setValue((prev) => ({ ...prev, error: "축약된 URL 주소를 입력해주세요." }));
    }
    setSelected(0);
    setImgs((prev) => [URL, ...prev]);
    setValue((prev) => ({ ...prev, URL, error: null }));
    handleModalClose();
  };

  return (
    <Container src={img} $check={check} {...props}>
      {img ? (
        check && (
          <div>
            <img src={CHECKIMG} alt="선택된 이미지" />
          </div>
        )
      ) : (
        <>
          <img src={PLUSIMG} alt="이미지 추가하기" />
          <InputFile onChange={handleChange} />
          <span></span>
          <InputURL value={value} onSubmit={handleSubmit} />
        </>
      )}
    </Container>
  );
}

function InputFile({ ...props }) {
  const input = useRef();
  const handleClick = (event) => {
    if (event.key === "Enter" || event.key === " " || event.type === "click") {
      event.preventDefault();
      input.current.click();
      event.currentTarget.blur();
    }
  };

  return (
    <>
      <label tabIndex={0} htmlFor="file" onClick={handleClick} onKeyUp={handleClick}>
        <p>
          파일
          <br />
          추가하기
        </p>
      </label>
      <input id="file" type="file" accept="image/*" ref={input} {...props} />
    </>
  );
}

function InputURL({ onSubmit, ...props }) {
  const { isOpen, handleModalOpen, handleModalClose } = useModal();
  const handleClick = (event) => {
    if (event.key === "Enter" || event.key === " ") handleModalOpen();
  };

  return (
    <>
      <label tabIndex={0} onClick={handleModalOpen} onKeyUp={handleClick}>
        <p>
          URL
          <br />
          추가하기
        </p>
      </label>
      {isOpen && (
        <ModalPortal>
          <ModalFrame onClickClose={handleModalClose}>
            <InputModal onSubmit={onSubmit(handleModalClose)} {...props} />
          </ModalFrame>
        </ModalPortal>
      )}
    </>
  );
}

function InputModal({ value, onSubmit }) {
  const input = useRef();

  return (
    <Container__modal onSubmit={onSubmit(input)}>
      <div>
        <h1>URL 주소</h1>
        <p>Tab + Shift로 뒤로 돌아갈 수 있습니다.</p>
      </div>
      <InputWrapper>
        <Input inputRef={input} pwError={value?.error} placeholder="이미지 주소 붙여넣기" autoFocus />
        {value?.error ? <p>{value.error}</p> : null}
      </InputWrapper>
      <Button width="100" height="l" type="primary">
        확인
      </Button>
    </Container__modal>
  );
}

export default Option;

const Container = styled.button`
  width: 100%;
  position: relative;

  border: 0.1rem solid rgba(0, 0, 0, 0.08);
  border-radius: 1.6rem;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: var(--Gray1);

  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }

  &:hover,
  &:focus-within {
    > img {
      display: none;
    }

    > span {
      height: 80%;
      border-right: 0.1rem solid var(--Gray4);

      display: block;
    }

    > label {
      width: 100%;
      height: 100%;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      cursor: pointer;

      &:hover,
      &:focus {
        p {
          ${FONT14B};
        }
      }

      p {
        ${FONT14}
      }
    }
  }

  ${FONT14}
  ${({ color }) => color};
  ${({ src, $check }) =>
    src && $check
      ? `background-image: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${src}); background-size: cover;`
      : `background-image: url(${src}); background-size: cover`};

  > div {
    width: 20%;
    height: 20%;

    border-radius: 10rem;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: var(--Gray5);
  }

  > span {
    display: none;
  }

  > label {
    display: none;
  }

  input[type="file"] {
    width: 0;
    height: 0;
    padding: 0;
    border: 0;

    display: none;

    position: absolute;
    overflow: hidden;
  }

  > img {
    @media (max-width: ${DeviceSize.mobile}) {
      width: 20%;
      height: auto;
    }
  }
`;

const Container__modal = styled.form`
  width: 36rem;
  padding: 4rem 4rem 3rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.4rem;

  background-color: white;
  border-radius: 15px;
  border: 1px solid var(--Gray2);

  div {
    text-align: center;
  }

  h1 {
    ${FONT18B}
  }

  p {
    ${FONT14}
    color: var(--Gray4);
  }
`;
const InputWrapper = styled.div`
  width: 100%;

  > p {
    margin-top: 1rem;
    color: var(--Error2);
    ${FONT14B}
  }
`;
