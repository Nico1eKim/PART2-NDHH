import defaultImg from "@/assets/default_profile.svg";
import Badge from "@/components/commons/Badge";
import Button from "@/components/commons/Button";
import { DeviceSize } from "@/styles/DeviceSize";
import { FONT12, FONT20, FONT20B } from "@/styles/FontStyles";
import { formatDate } from "@/utils/formatDate";
import propTypes from "prop-types";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

/**
 * @param {*} data 메세지 데이터 객체
 */
Card.propTypes = {
  type: propTypes.oneOf(["Normal", "Edit", "Plus"]),
  data: propTypes.object,
};
function Card({ type, data = null, onCardClick, setDelList }) {
  const { id } = useParams();
  const [selected, setSelected] = useState(false);

  if (type === "Plus") {
    return (
      <Container $type="Plus">
        <Link tabIndex={-1} to={`/post/${id}/message`}>
          <PlusIcon>
            <Button type="plus" />
          </PlusIcon>
        </Link>
      </Container>
    );
  }

  const { id: messageId, sender, profileImageURL, relationship, content, createdAt } = data;

  const handleCardClick = async () => {
    setSelected((prev) => !prev);
    if (selected) return setDelList((prev) => prev.filter((item) => item !== messageId));
    setDelList((prev) => [...prev, messageId]);
  };

  return (
    <Container $select={selected}>
      <Profile>
        <ProfileWrapper>
          <ProfileImg src={profileImageURL || defaultImg} alt={`${sender}님의 프로필 사진`} />
          <Wrapper>
            <Sender>
              From. <Bold>{sender}</Bold>
            </Sender>
            <Badge>{relationship}</Badge>
          </Wrapper>
        </ProfileWrapper>
        {type === "Edit" && (
          <DeleteIcon onClick={handleCardClick}>
            <Button type={selected ? "redo" : "trash"} />
          </DeleteIcon>
        )}
      </Profile>
      <ContentWrapper>
        <Content dangerouslySetInnerHTML={{ __html: content }}></Content>
        <More tabIndex={0} onClick={onCardClick(data)}>
          더보기
        </More>
      </ContentWrapper>
      <Date>{formatDate(createdAt)}</Date>
    </Container>
  );
}

export default Card;

const Container = styled.div`
  width: 100%;
  max-width: 38.4rem;
  min-width: 30rem;
  height: 28rem;
  padding: 2.8rem 2.4rem 2.4rem;

  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.6rem;

  border-radius: 1.6rem;

  background-color: var(--White);
  box-shadow: 0px 0.2rem 1.2rem 0px rgba(0, 0, 0, 0.08);
  opacity: ${({ $select }) => ($select ? 0.6 : 1)};

  @media (max-width: ${DeviceSize.tablet}) {
    max-width: 50rem;
  }
`;

const ProfileImg = styled.img`
  width: 5.6rem;
  height: 5.6rem;

  object-fit: cover;

  border-radius: 10rem;
  border: 1px solid var(--Gray2);

  background: var(--white);
`;

const Profile = styled.div`
  width: 100%;
  padding-bottom: 1.6rem;

  display: flex;
  justify-content: space-between;

  border-bottom: 0.1rem solid var(--Gray2);
`;

const ProfileWrapper = styled.div`
  display: flex;
  gap: 1.4rem;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  justify-content: center;
  align-items: flex-start;
`;

const Sender = styled.div`
  ${FONT20};
  color: var(--Black);
  line-height: 120%;
`;

const Bold = styled.span`
  ${FONT20B};
  line-height: 120%;
`;

const DeleteIcon = styled.div`
  width: 4rem;
  height: 4rem;
`;

const Content = styled.div`
  padding-right: 1rem;

  p {
    font-size: 1.6rem;
    font-weight: 400;
    line-height: normal;
  }

  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;

  color: var(--Gray6);
  word-wrap: break-word;
  letter-spacing: -0.018rem;
`;

const Date = styled.div`
  width: 100%;

  ${FONT12}
  color: var(--Gray4);
  text-align: start;
  letter-spacing: -0.006rem;
`;

const PlusIcon = styled.div`
  width: 5.6rem;
  height: 5.6rem;
`;

const More = styled.button`
  ${FONT12}
  color: var(--Gray4);
  text-align: right;

  &:hover {
    cursor: pointer;

    color: var(--Gray7);
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 10.6rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
