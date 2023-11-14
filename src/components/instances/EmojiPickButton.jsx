import EmojiPicker from "emoji-picker-react";
import { FONT14B, FONT16B } from "@/styles/FontStyles";
import Button from "../commons/Button";
import { useRef, useState } from "react";
import { Z_INDEX } from "@/styles/ZindexStyles";
import api from "@/api/api";
import styled from "styled-components";
import { DeviceSize } from "@/styles/DeviceSize";
import { makeEmoji } from "@/api/makePostData";

function EmojiPickButton({ id }) {
  const containerRef = useRef(null);

  const [isEmojiVisible, setIsEmojiVisible] = useState(false);

  const handleBlur = (event) => {
    if (!containerRef.current.contains(event.relatedTarget)) {
      setIsEmojiVisible(false);
    }
  };

  const handleClick = () => {
    setIsEmojiVisible(true);
  };

  const onEmojiClick = async (event) => {
    const emojiSrc = event.emoji;
    const { postData } = makeEmoji(emojiSrc);

    const fetchResult = await api("RECIPIENTS_REACTIONS", "POST", id, postData);

    if (fetchResult) {
      window.location.reload(true);
      setIsEmojiVisible(false);
    }
  };

  return (
    <CustomButton type="outlined" width="94" height="m" icon onClick={handleClick}>
      <ButtonText>추가</ButtonText>
      {isEmojiVisible && (
        <Wrapper_Emoji onBlur={handleBlur} ref={containerRef}>
          <EmojiPicker onEmojiClick={onEmojiClick} />
        </Wrapper_Emoji>
      )}
    </CustomButton>
  );
}

export default EmojiPickButton;

const CustomButton = styled(Button)`
  position: relative;
  @media (max-width: ${DeviceSize.mobile}) {
    width: 4.4rem;
    padding: 0.6rem 0.6rem;
  }
`;

const Wrapper_Emoji = styled.div`
  position: absolute;
  top: 4rem;
  right: 0rem;

  z-index: ${Z_INDEX.Wrapper_Emoji};

  @media (max-width: 1350px) {
    right: 3rem;
  }

  @media (max-width: ${DeviceSize.mobile}) {
    right: -14rem;
  }
`;

const ButtonText = styled.p`
  ${(props) => (props.$B ? FONT16B : FONT16B)}

  @media (max-width: ${DeviceSize.mobile}) {
    ${(props) => (props.$B ? FONT14B : "display: none")}
  }
`;
