import Header from "@/components/commons/header/Header";
import ButtonControl from "@/components/post/ButtonControl";
import CardGrid from "@/components/post/CardGrid";
import PostSkeleton from "@/components/post/PostSkeleton";
import useGetData from "@/hooks/useGetData";
import { DeviceSize } from "@/styles/DeviceSize";
import { checkEditToken } from "@/utils/checkEditToken";
import propTypes from "prop-types";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import styled from "styled-components";

Layout.propTypes = {
  path: propTypes.oneOf(["edit", ""]),
};

function Layout({ path = "" }) {
  const { id } = useParams();
  const [DEP, setDEP] = useState([]);
  const recipientData = useGetData("RECIPIENTS_ID", id, DEP);
  const messageData = useGetData("RECIPIENTS_MESSAGES", id, DEP, 1000);
  const reactions = useGetData("RECIPIENTS_REACTIONS", id, DEP);
  const [delList, setDelList] = useState([]);
  checkEditToken(id, path);

  if (!recipientData || !messageData || !reactions) {
    return <PostSkeleton />;
  }

  return (
    recipientData &&
    messageData && (
      <>
        <Helmet>
          <title> {path === "edit" ? "Edit" : recipientData.name.slice(0, -4)} | Rolling</title>
        </Helmet>
        <Header userData={recipientData} setDEP={setDEP} reactions={reactions} serviceType />
        <Background $color={recipientData.backgroundColor} $url={recipientData.backgroundImageURL}>
          {recipientData.backgroundImageURL && <Mask></Mask>}
          <Container>
            <ButtonControl recipientData={recipientData} setDEP={setDEP} path={path} delList={delList} setDelList={setDelList} recentMessages={messageData} />
            <CardGrid path={path} messageCount={recipientData.messageCount} recentMessages={messageData} setDelList={setDelList} />
          </Container>
        </Background>
      </>
    )
  );
}

export default Layout;

const Background = styled.div`
  width: 100%;
  min-height: 100vh;
  padding-bottom: 24.6rem;

  position: relative;

  background-color: ${({ $color }) => `var(--${$color}2)`};
  background-image: ${({ $url }) => `url(${$url})`};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

const Mask = styled.div`
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;

  background: rgba(0, 0, 0, 0.5);
`;

const Container = styled.div`
  width: 120rem;
  padding-top: 6.3rem;
  margin: 0 auto;

  position: relative;

  display: flex;
  flex-direction: column;
  align-items: flex-end;

  @media (max-width: 1248px) {
    width: 100%;
    padding: 6.3rem 2.4rem 0;
  }

  @media (max-width: ${DeviceSize.mobile}) {
    max-width: 42.4rem;
    padding: 6.3rem 2rem 0;
  }
`;
