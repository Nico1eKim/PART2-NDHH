import ContentLoader from "react-content-loader";
import { styled } from "styled-components";

const ListSkeleton = () => {
  const cardWidth = 275;
  const cardHeight = 260;
  const searchWidth = 700;
  const searchHeight = 58;
  const titleWidth = 200;
  const titleHeight = 36;
  const gapX = 20;
  const gapY1 = 50;
  const gapY2 = 16;
  const br = 20; // border radius

  const x1 = 0;
  const x2 = x1 + cardWidth + gapX;
  const x3 = x2 + cardWidth + gapX;
  const x4 = x3 + cardWidth + gapX;

  const y1 = searchHeight + gapY1;
  const y2 = y1 + gapY2 + titleHeight;
  const y3 = y2 + cardHeight + gapY1;
  const y4 = y3 + gapY2 + titleHeight;

  return (
    <Container>
      <ContentLoader viewBox="0 0 1160 820" height="100%" width="100%" backgroundColor="#f5f5f5" foregroundColor="#dbdbdb">
        {/* searchbar */}
        <rect x={230} y={0} rx="15" ry="15" width={searchWidth} height={searchHeight} />

        {/* cardList1 */}
        <rect x={x1} y={y1} rx="0" ry="0" width={titleWidth} height={titleHeight} />

        <rect x={x1} y={y2} rx={br} ry={br} width={cardWidth} height={cardHeight} />
        <rect x={x2} y={y2} rx={br} ry={br} width={cardWidth} height={cardHeight} />
        <rect x={x3} y={y2} rx={br} ry={br} width={cardWidth} height={cardHeight} />
        <rect x={x4} y={y2} rx={br} ry={br} width={cardWidth} height={cardHeight} />

        {/* cardList2 */}
        <rect x={x1} y={y3} rx="0" ry="0" width={titleWidth} height={titleHeight} />

        <rect x={x1} y={y4} rx={br} ry={br} width={cardWidth} height={cardHeight} />
        <rect x={x2} y={y4} rx={br} ry={br} width={cardWidth} height={cardHeight} />
        <rect x={x3} y={y4} rx={br} ry={br} width={cardWidth} height={cardHeight} />
        <rect x={x4} y={y4} rx={br} ry={br} width={cardWidth} height={cardHeight} />
      </ContentLoader>
    </Container>
  );
};

const Container = styled.div`
  width: 1160px;
  margin: auto;

  position: relative;
  top: 50px;
`;

export default ListSkeleton;
