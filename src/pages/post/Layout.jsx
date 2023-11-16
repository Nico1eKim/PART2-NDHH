import Header from "@/components/Header";
import ButtonControl from "@/components/post/ButtonControl";
import CardGrid from "@/components/post/CardGrid";
import useGetData from "@/hooks/useGetData";
import { DeviceSize } from "@/styles/DeviceSize";
import { useState, useRef, useEffect } from "react";
import api from "@/api/api";
import { checkEditToken } from "@/utils/checkEditToken";
import propTypes from "prop-types";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import styled from "styled-components";

Layout.propTypes = {
  path: propTypes.oneOf(["edit", ""]),
};

const LIMIT = 8;

function Layout({ path = "" }) {
  const { id } = useParams();
  const [DEP, setDEP] = useState([]);
  const [delList, setDelList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState("");
  const [items, setItems] = useState([]);
  const target = useRef();

  const handleLoad = async (offset, LIMIT) => {
    const { results, next } = await api("RECIPIENTS_MESSAGES", "GET", id, null, null, hasNext);
    if (offset === 0) {
      setItems(results);
    } else {
      setItems([...items, ...results]);
    }
    setOffset(offset + LIMIT);
    setHasNext(next);
  };

  useEffect(() => {
    let options = {
      threshold: "1.0",
    };

    let handleIntersection = async ([entries], observer) => {
      if (entries.isIntersecting) {
        hasNext && (await handleLoad(offset, LIMIT));
        observer.unobserve(entries.target);
      }
    };

    const io = new IntersectionObserver(handleIntersection, options);
    if (target.current) io.observe(target.current);

    offset === 0 && handleLoad(0, LIMIT);
    return () => io && io.disconnect();
  }, [target, offset]);

  const recipientData = useGetData("RECIPIENTS_ID", id, null, DEP);
  const reactions = useGetData("RECIPIENTS_REACTIONS", id, null, DEP);

  checkEditToken(id, path);
  if (!recipientData || !reactions) return;

  return (
    <>
      {path === "edit" ? (
        <Helmet>
          <title>Edit | Rolling</title>
        </Helmet>
      ) : (
        <Helmet>
          <title>{recipientData.name.slice(0, -4)} | Rolling</title>
        </Helmet>
      )}
      <Header userData={recipientData} setDEP={setDEP} reactions={reactions} serviceType />
      <Background $color={recipientData.backgroundColor} $url={recipientData.backgroundImageURL}>
        {recipientData.backgroundImageURL && <Mask></Mask>}
        <Container>
          <ButtonControl name={recipientData.name} setOffset={setOffset} setDEP={setDEP} path={path} delList={delList} setDelList={setDelList} />
          <CardGrid path={path} messageCount={recipientData.messageCount} recentMessages={items} setDelList={setDelList} />
        </Container>
        <div ref={target}></div>
        <button onClick={handleClick}>
          <img src={arrowImg} />
        </button>
      </Background>
    </>
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
