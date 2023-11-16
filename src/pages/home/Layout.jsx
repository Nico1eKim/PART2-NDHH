import introducePoint1 from "@/assets/introduce_point_1.svg";
import introducePoint2 from "@/assets/introduce_point_2.svg";
import FixedButton from "@/components/instances/FixedButton";
import KeyPointCard from "@/components/instances/KeyPointCard";
import { DeviceSize } from "@/styles/DeviceSize";
import styled from "styled-components";

const content1 = {
  point: "Point. 01",
  title1: "누구나 손쉽게, 온라인 ",
  title2: "롤링 페이퍼를 만들 수 있어요",
  explain: "로그인 없이 자유롭게 만들어요.",
  image: introducePoint1,
};

const content2 = {
  point: "Point. 02",
  title1: "서로에게 이모지로 감정을 ",
  title2: "표현해보세요",
  explain: "롤링 페이퍼에 이모지를 추가할 수 있어요.",
  image: introducePoint2,
};

function Layout() {
  return (
    <Container>
      <KeyPointCard content={content1} />
      <KeyPointCard content={content2} $isReverse />
      <FixedButton link="/list">구경해보기</FixedButton>
    </Container>
  );
}

export default Layout;

const Container = styled.div`
  margin-top: 6rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  @media (max-width: ${DeviceSize.pc}) {
    margin-top: 4.9rem;
  }
`;
