import EmojiPicker from "emoji-picker-react";
import { FONT14B, FONT16B } from "@/styles/FontStyles";
import Button from "../commons/Button";
import { useRef, useState } from "react";
import { Z_INDEX } from "@/styles/ZindexStyles";
import api from "@/api/api";
import styled from "styled-components";
import { DeviceSize } from "@/styles/DeviceSize";
import { makeEmoji } from "@/api/makePostData";

function EmojiPickButton({ id, setDEP }) {
  const containerRef = useRef(null);
  const [isEmojiVisible, setIsEmojiVisible] = useState(false);

  const handleBlur = (event) => {
    if (!containerRef.current.contains(event.relatedTarget)) {
      setIsEmojiVisible(false);
    }
  };

  const handleClick = () => {
    setIsEmojiVisible(!isEmojiVisible);
  };

  const onEmojiClick = async (event) => {
    const emojiSrc = event.emoji;
    const { postData } = makeEmoji(emojiSrc);

    const fetchResult = await api("RECIPIENTS_REACTIONS", "POST", id, postData);

    if (fetchResult) {
      setDEP([]);
      setIsEmojiVisible(false);
    }
  };

  return (
    <>
      <Container onBlur={handleBlur}>
        <CustomButton type="outlined" width="94" height="m" icon onClick={handleClick}>
          <ButtonText>추가</ButtonText>
        </CustomButton>
        <Wrapper_Emoji $isEmojiVisible={isEmojiVisible} ref={containerRef}>
          <EmojiPicker onEmojiClick={onEmojiClick} emojiStyle="native" lazyLoadEmojis={true} />
        </Wrapper_Emoji>
      </Container>
    </>
  );
}

export default EmojiPickButton;

const Container = styled.div`
  position: relative;
`;

const CustomButton = styled(Button)`
  position: relative;
  @media (max-width: ${DeviceSize.mobile}) {
    width: 4.4rem;
    padding: 0.6rem 0.6rem;
  }
`;

const Wrapper_Emoji = styled.div`
  display: ${(props) => (props.$isEmojiVisible ? "block" : "none")};
  position: absolute;
  top: 4.5rem;
  right: 0rem;

  z-index: ${Z_INDEX.Wrapper_Emoji};

  @media (max-width: 1350px) {
    right: 3rem;
  }

  @media (max-width: ${DeviceSize.mobile}) {
    right: -9rem;
  }
`;

const ButtonText = styled.p`
  ${(props) => (props.$B ? FONT16B : FONT16B)}

  @media (max-width: ${DeviceSize.mobile}) {
    ${(props) => (props.$B ? FONT14B : "display: none")}
  }
`;
