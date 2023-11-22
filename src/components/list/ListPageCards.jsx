import Button from "@/components/commons/Button";
import CardList from "@/components/list/CardList";
import { DeviceSize } from "@/styles/DeviceSize";
import { Z_INDEX } from "@/styles/ZindexStyles";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function ListPageCards({ cards }) {
  const [scrollX, setScrollX] = useState(0);
  const [showNextButton, setShowNextButton] = useState(true);

  const cardsQuantity = cards.length;

  const handleClick = () => {
    setScrollX(scrollX - 29.5); // 왼쪽으로 29.5rem 이동

    if (scrollX <= -29.5 * (cardsQuantity - 5)) {
      setShowNextButton(false);
    }
  };
  const handleClickReverse = () => {
    setScrollX(scrollX + 29.5);
    setShowNextButton(true);
  };

  const handleDbClick = () => {
    setScrollX(-29.5 * (cardsQuantity - 4)); // 카드 리스트 제일 끝으로 이동
    setShowNextButton(false);
  };

  const handleDbClickReverse = () => {
    setScrollX(0);
    setShowNextButton(true);
  };

  return (
    <>
      <Container>
        <Wrapper>
          {scrollX !== 0 && cardsQuantity > 4 && <CustomButton onClick={handleClickReverse} onDoubleClick={handleDbClickReverse} type={"arrowLeft"} width="40" $isReverse />}
          <Items $isSmall={cardsQuantity < 4} $num={cardsQuantity} style={{ transform: `translateX(${scrollX}rem)` }}>
            {cards.map((card, index) => (
              <Link to={`/post/${card.id}`} key={index}>
                <CardList data={card} />
              </Link>
            ))}
          </Items>
          {showNextButton && cardsQuantity > 4 && <CustomButton onClick={handleClick} onDoubleClick={handleDbClick} type={"arrowRight"} width="40" />}
        </Wrapper>
      </Container>
    </>
  );
}

export default ListPageCards;

const Container = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;

  align-self: center;

  @media (max-width: ${DeviceSize.pc}) {
    width: 100%;
    align-self: flex-start;
  }
`;

const Wrapper = styled.div`
  max-width: 116rem;

  overflow: hidden;

  @media (max-width: ${DeviceSize.pc}) {
    max-width: 120rem;

    overflow-x: auto;
    -webkit-overflow-scrolling: touch; /* iOS 스와이프 지원 */
  }
`;

const Items = styled.div`
  width: 100%;

  display: flex;
  gap: 2rem;
  justify-content: ${({ $isSmall }) => ($isSmall ? "center" : "")};

  transition: transform 0.3s;

  @media (max-width: ${DeviceSize.mobile}) {
    grid-template-columns: repeat(${(props) => props.$num}, 1fr);
    gap: 1.2rem;
  }
`;

const CustomButton = styled(Button)`
  position: absolute;
  bottom: 9rem;

  z-index: ${Z_INDEX.list_page_arrow_button};

  transform: translateY(-50%);

  ${(props) => (props.$isReverse ? "left: -2rem" : "right: -2rem")};

  img {
    width: 4rem;
    opacity: 0.9;
  }

  @media (max-width: ${DeviceSize.pc}) {
    display: none;
  }
`;
