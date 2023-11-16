import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import logoImg from "@/assets/Logo.svg";
import { Link } from "react-router-dom";
import { FONT16B, FONT28B } from "@/styles/FontStyles";

function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>Page Not Found</title>
      </Helmet>

      <Container>
        <Wrapper>
          <Link to="/">
            <Logo src={logoImg} />
          </Link>
          <Text>
            <P1>
              접근 권한이 없거나 존재하지 않는 페이지입니다!
              <br />
              This page does not exist.
            </P1>
            <P2>｡° ૮₍°´ᯅ`°₎ა °｡</P2>
          </Text>
        </Wrapper>
      </Container>
    </>
  );
}

export default NotFoundPage;

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  background-color: var(--purple1);
`;

const Wrapper = styled.div`
  max-width: 60rem;
  min-height: 18rem;

  margin: auto;
  padding-top: 25rem;

  display: flex;
  flex-direction: column;
  gap: 5rem;
`;

const Logo = styled.img`
  width: 15rem;
  height: auto;
`;

const Text = styled.div`
  margin: 3rem 0;

  display: flex;
  gap: 4rem;
`;

const P1 = styled.p`
  ${FONT16B}
  line-height: 200%;

  color: var(--purple9);
`;

const P2 = styled.p`
  ${FONT28B}
`;
