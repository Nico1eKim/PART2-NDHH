import Dropdown from "@/components/commons/Dropdown";
import TextEditor from "@/components/commons/Editor";
import Option from "@/components/commons/Option";
import { Container, Submit, Title } from "@/components/commons/CreateMessage";
import { REL } from "@/styles/ColorStyles";
import { FONT16, FONT24B } from "@/styles/FontStyles";
import { useState } from "react";
import styled, { keyframes } from "styled-components";

const DEFAULT = [
  "https://i.ibb.co/YBLJML7/Frame-2593.png",
  "https://i.ibb.co/bb24Bwq/lease.jpg",
  "https://i.ibb.co/7Jc9CQB/tree.jpg",
  "https://i.ibb.co/cgysY87/snowman.jpg",
  "https://i.ibb.co/kqV6Svd/cake.jpg",
  "https://i.ibb.co/2qvZMFg/snowball.jpg",
];

const INITIAL = {
  sender: "",
  URL: DEFAULT[0],
  relationship: REL.O,
  content: undefined,
  font: "Noto Sans",
};

function Layout() {
  const [value, setValue] = useState(INITIAL);

  return (
    <Container>
      <Title message value={value.sender} setValue={setValue} />
      <Profile value={value} setValue={setValue} />
      <Relationship value={value.relationship} setValue={setValue} />
      <Edit setValue={setValue} />
      <Submit value={value} />
    </Container>
  );
}

export default Layout;

function Profile({ ...props }) {
  return (
    <BaseContents>
      <p>
        프로필. <span>당신을 보여주기에 딱인 곳.</span>
      </p>
      <ProfileImgControl {...props} />
    </BaseContents>
  );
}

function ProfileImgControl({ ...props }) {
  const [imgs, setImgs] = useState(DEFAULT);
  const [selected, setSelected] = useState(0);

  return (
    <Contents__profileControl>
      <ProfileImg $src={imgs[selected]} alt="설정된 프로필 이미지" />
      <p>{imgs.length > 1 ? `상대에게 설명해 줄 나의 모습.` : `어떤 모습이든지. 아름다운 당신.`}</p>
      <AddImg imgs={imgs} setImgs={setImgs} selected={selected} setSelected={setSelected} {...props} />
    </Contents__profileControl>
  );
}

function AddImg({ value, setValue, imgs, setImgs, selected, setSelected }) {
  const handleClick = (idx, URL) => () => {
    setSelected(idx);
    setValue((prev) => ({ ...prev, URL }));
  };

  return (
    <Contents__addImg>
      <Option value={value} setValue={setValue} setImgs={setImgs} setSelected={setSelected} />
      {imgs.map((img, idx) => (
        <Option key={idx} alt={`${idx + 1}번째로 추가한 사진`} check={selected === idx} img={img} onClick={handleClick(idx, img)} />
      ))}
    </Contents__addImg>
  );
}

const RELATIONSHIP = Object.values(REL);

function Relationship({ value, setValue }) {
  const handleClick = (relationship) => {
    setValue((prev) => ({ ...prev, relationship }));
  };

  return (
    <BaseContents>
      <p>
        너의 의미. <span>어떤 사람이 되고 싶으세요?</span>
      </p>
      <Dropdown value={value} setValue={handleClick} items={RELATIONSHIP} />
    </BaseContents>
  );
}

function Edit({ setValue }) {
  return (
    <BaseContents>
      <p>
        보내고 싶은 단편. <span>애틋함을 아로새기다.</span>
      </p>
      <TextEditor setValue={setValue} />
    </BaseContents>
  );
}

const BaseContents = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  > p {
    ${FONT24B}

    > span {
      ${FONT24B}
      color: var(--Gray5);
    }
  }
`;

const Contents__profileControl = styled.div`
  display: grid;
  grid-template: auto auto / auto 1fr;
  grid-template-areas:
    "img text"
    "img add";
  column-gap: 3.2rem;

  > p {
    margin-bottom: 1.2rem;

    ${FONT16};
    color: var(--Gray5);

    grid-area: text;
  }
`;

const ProfileImg = styled.div`
  width: 9.3rem;
  height: 9.3rem;
  border-radius: 10rem;

  grid-area: img;

  ${({ $src }) => $src && `background-image: url(${$src}); background-size: cover;`}
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Contents__addImg = styled.div`
  grid-area: add;
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  > button:first-child {
    background-color: var(--Gray5);

    transition: 0.5s ease-in;

    &:hover,
    &:focus-within {
      width: 15rem;
      height: 5.6rem;

      display: flex;
      align-items: center;

      background-color: var(--Gray2);

      transition: 0.5s ease-out;

      label {
        animation: ${fadeIn} 1.5s;
      }
    }

    img {
      width: 5.6rem;
    }
  }

  > button {
    width: 5.6rem;
    height: 5.6rem;
    margin-right: 0.4rem;

    border: 0;
    border-radius: 10rem;

    &::after {
      display: none;
    }

    div {
      width: 60%;
      height: 60%;
    }
  }
`;
