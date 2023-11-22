import Input from "@/components/commons/Input";
import Option from "@/components/commons/Option";
import ToggleButton from "@/components/commons/ToggleButton";
import { Container, Submit, Title } from "@/components/commons/CreateMessage";
import { SELECTED } from "@/styles/ButtonStyles";
import { COLOR } from "@/styles/ColorStyles";
import { DeviceSize } from "@/styles/DeviceSize";
import { FONT16, FONT24B } from "@/styles/FontStyles";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const DefaultBG = ["https://i.ibb.co/kgwVr13/xmas2.jpg", "https://i.ibb.co/M5fwrdQ/xmas.jpg", "https://i.ibb.co/zhfb9x3/forest.jpg", "https://i.ibb.co/xD8zBpL/nighthouse.jpg"];

const INITIAL = {
  name: "",
  backgroundColor: COLOR.O,
  URL: null,
  password: "",
};

function Layout() {
  const [value, setValue] = useState(INITIAL);

  return (
    <>
      <Container>
        <Title value={value.name} setValue={setValue} />
        <Text />
        <SelectOption value={value} setValue={setValue} />
        <Password value={value.password} setValue={setValue} />
        <Submit value={value} />
      </Container>
    </>
  );
}

export default Layout;

function Text() {
  return (
    <Contents__text>
      <h2>주고 싶은 사람을 표현하기.</h2>
      <p>색깔로 부담없이. 이미지로 더욱 특별하게.</p>
    </Contents__text>
  );
}

let tempURL = null;
let tempCOLOR = COLOR.O;

function SelectOption({ value, setValue }) {
  const [selectedType, setSelectedType] = useState(SELECTED.color);

  useEffect(() => {
    const isColor = selectedType === SELECTED.color ? true : false;
    if (isColor) {
      tempURL = value.URL;
      setValue((prev) => ({ ...prev, backgroundColor: tempCOLOR, URL: null }));
      return;
    }
    tempCOLOR = value.backgroundColor;
    setValue((prev) => ({ ...prev, backgroundColor: null, URL: tempURL }));
  }, [selectedType]);

  return (
    <>
      <ToggleButton handleToggle={setSelectedType} selected={selectedType} />
      <Options selectedType={selectedType} value={value} setValue={setValue} />
    </>
  );
}

function Options({ selectedType, value, setValue }) {
  const [imgs, setImgs] = useState(DefaultBG);
  const [orderColor, setOrderColor] = useState(0);
  const [orderImg, setOrederImg] = useState("");
  const isColor = selectedType === SELECTED.color ? true : false;

  const handleOptionClick = (idx, item) => () => {
    if (isColor) {
      const backgroundColor = item;
      setOrderColor(idx);
      setValue((prev) => ({ ...prev, backgroundColor }));
      return;
    }
    const URL = item;
    setOrederImg(idx);
    setValue((prev) => ({ ...prev, URL }));
  };

  return (
    <Container__Options>
      {isColor && Object.values(COLOR).map((color, idx) => <Option key={idx} color={color} check={orderColor === idx} onClick={handleOptionClick(idx, color)} />)}
      {isColor || (
        <>
          <Option value={value} setValue={setValue} setImgs={setImgs} setSelected={setOrederImg} />
          {imgs.map((img, idx) => (
            <Option key={idx} check={orderImg === idx} img={img} onClick={handleOptionClick(idx, img)} />
          ))}
        </>
      )}
    </Container__Options>
  );
}

function Password({ value, setValue }) {
  const input = useRef();
  const handleChange = () => {
    const pw = input.current.value;
    setValue((prev) => ({ ...prev, password: pw }));
    if (pw.length > 4) {
      const password = pw.slice(4);
      setValue((prev) => ({ ...prev, password }));
    }
  };

  return (
    <Contents__text>
      <h2>나만의 열쇠. 4자리 숫자.</h2>
      <p>쓰다. 지우다. 고치다. 빠져들다.</p>
      <Input type="number" inputRef={input} value={value} onChange={handleChange} placeholder="****" />
    </Contents__text>
  );
}

const Contents__text = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.4rem;

  > h2 {
    color: var(--Gray9);
    ${FONT24B}
  }

  > p {
    color: var(--Gray5);
    ${FONT16}
  }

  > input {
    margin-top: 2rem;
  }
`;

const Container__Options = styled.div`
  width: calc(100vw - 9.6rem);
  max-width: 120rem;

  display: grid;
  grid-template-columns: repeat(4, minmax(20.8rem, 28.8rem));
  justify-content: space-between;
  gap: 1.6rem;

  @media (max-width: ${DeviceSize.tablet}) {
    grid-template-columns: repeat(3, minmax(20.8rem, 29.9rem));
    gap: 1.6rem;
  }

  @media (max-width: ${DeviceSize.mobile}) {
    grid-template-columns: repeat(2, minmax(15.2rem, 32.8rem));
  }
`;
