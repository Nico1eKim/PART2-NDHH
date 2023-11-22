import Logo from "@/assets/Logo.svg";
import divideLine from "@/assets/Rectangle_38.svg";
import Button from "@/components/commons/Button";
import ProfileImgList from "@/components/commons/ProfileImgList";
import HeaderEmojis from "@/components/commons/header/HeaderEmoji";
import ShareDropdownButton from "@/components/commons/header/ShareDropdownButton";
import { DeviceSize } from "@/styles/DeviceSize";
import { FONT14B, FONT16B, FONT18, FONT18B, FONT28B } from "@/styles/FontStyles";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

Header.propTypes = {
  serviceType: PropTypes.oneOf([true, false]),
  hideButton: PropTypes.oneOf([true, false]),
};

function Header({ serviceType, hideButton = false, userData, setDEP, reactions }) {
  return serviceType ? MakeServiceHeader({ userData, reactions, setDEP }) : MakeNavHeader({ hideButton });
}

function MakeNavHeader({ hideButton }) {
  return (
    <>
      <Container $B>
        <Link to="/">
          <img src={Logo} />
        </Link>
        {!hideButton && (
          <Button type="outlined" width="170" height="l">
            <Link tabIndex={-1} to="/post">
              <ButtonText $B>롤링 페이퍼 만들기</ButtonText>
            </Link>
          </Button>
        )}
      </Container>
      <Border></Border>
    </>
  );
}

function MakeServiceHeader({ userData, reactions, setDEP }) {
  if (!userData) return;
  const name = userData.name.slice(0, -4);

  return (
    <>
      <Container>
        <Recipient>To. {name}</Recipient>
        <Wrapper>
          <SendersNum>
            <Contents $messageCount={userData.messageCount}>
              <ProfileImgList messageCount={userData.messageCount} data={userData.recentMessages} />
            </Contents>
            <P $B>{userData.messageCount}</P>
            <P> 명이 작성했어요!</P>
            <DivideImg src={divideLine} />
          </SendersNum>
          <HeaderEmojis topReactions={userData.topReactions} reactions={reactions} id={userData.id} setDEP={setDEP} />
          <DivideImg src={divideLine} />
          <ShareDropdownButton userData={userData} />
        </Wrapper>
      </Container>
      <BorderLine />
    </>
  );
}

function BorderLine() {
  return (
    <Container__border>
      <Border $Bottom></Border>
      <Border></Border>
    </Container__border>
  );
}

export default Header;

const MobileGrid = css`
  @media (max-width: ${DeviceSize.mobile}) {
    height: 10.4rem;
    padding: 0;

    display: grid;
    grid-template-rows: 5.2rem 5.2rem;
    grid-template-areas:
      "Recipient"
      "Wrapper";
    justify-content: start;
    gap: 0.1rem;
  }
`;

const Container = styled.div`
  width: calc(100vw - 4.8rem);
  height: ${(props) => (props.$B ? "6.5rem" : "6.8rem")};
  max-width: 115.2rem;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background: var(--White);

  @media (max-width: ${DeviceSize.mobile}) {
    /* width: calc(100vw - 4rem); */
    height: 5.2rem;
  }

  ${(props) => (props.$B ? "" : MobileGrid)}
`;

const Recipient = styled.p`
  grid-area: "Recipient";

  ${FONT28B};

  @media (max-width: ${DeviceSize.mobile}) {
    ${FONT18B}
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  grid-area: "Wrapper";
`;

const Contents = styled.div`
  position: relative;
  left: ${({ $messageCount }) => ($messageCount > 2 ? "1.4rem" : "4.5rem")};
`;

const ButtonText = styled.p`
  ${(props) => (props.$B ? FONT16B : FONT16B)}

  @media (max-width: ${DeviceSize.mobile}) {
    ${(props) => (props.$B ? FONT14B : "display: none")}
  }
`;

const DivideImg = styled.img`
  margin: 0 2.8rem;

  @media (max-width: ${DeviceSize.mobile}) {
    margin: 0 1.5rem;
  }
`;

const P = styled.p`
  ${(props) => (props.$B ? FONT18B : FONT18)};
`;

const SendersNum = styled.div`
  display: flex;

  @media (max-width: ${DeviceSize.pc}) {
    display: none;
  }
`;

const Container__border = styled.div`
  width: 100%;
  position: relative;
`;

const Border = styled.div`
  width: 100%;

  position: ${(props) => (props.$Bottom ? "absolute" : "static")};
  z-index: 5;

  display: ${(props) => (props.$Bottom ? "none" : "block")};

  border-bottom: 0.1rem solid var(--Gray2);

  @media (max-width: ${DeviceSize.mobile}) {
    display: ${(props) => (props.$Bottom ? "block" : "block")};
    bottom: ${(props) => (props.$Bottom ? "5.2rem" : "0")};
    left: 0;
  }
`;
