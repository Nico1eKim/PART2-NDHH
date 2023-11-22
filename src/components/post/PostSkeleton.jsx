import React from "react";
import ContentLoader from "react-content-loader";
import { styled } from "styled-components";

const PostSkeleton = () => {
  const cardWidth = 384;
  const cardHeight = 280;
  const gap = 24;
  const br = 20; // border radius

  const x1 = 0;
  const x2 = x1 + cardWidth + gap;
  const x3 = x2 + cardWidth + gap;

  const y1 = 0;
  const y2 = y1 + cardHeight + gap;

  return (
    <>
      <Header>
        <ContentLoader viewBox="0 0 1710 68" width="1710" height="68" backgroundColor="#f5f5f5" foregroundColor="#dbdbdb">
          <rect x={x1} y="0" rx="0" ry="0" width="100%" height="68" />
        </ContentLoader>
      </Header>
      <CardList>
        <ContentLoader viewBox="0 0 1200 820" width="100%" height="100%" backgroundColor="#f5f5f5" foregroundColor="#dbdbdb">
          {/* cardList1 */}
          <rect x={x1} y={y1} rx={br} ry={br} width={cardWidth} height={cardHeight} />
          <rect x={x2} y={y1} rx={br} ry={br} width={cardWidth} height={cardHeight} />
          <rect x={x3} y={y1} rx={br} ry={br} width={cardWidth} height={cardHeight} />

          {/* cardList2 */}
          <rect x={x1} y={y2} rx={br} ry={br} width={cardWidth} height={cardHeight} />
          <rect x={x2} y={y2} rx={br} ry={br} width={cardWidth} height={cardHeight} />
          <rect x={x3} y={y2} rx={br} ry={br} width={cardWidth} height={cardHeight} />
        </ContentLoader>
      </CardList>
    </>
  );
};

const Header = styled.div`
  width: 100%;
`;

const CardList = styled.div`
  width: 1200px;
  margin: auto;

  position: relative;
  top: 116px;
`;

export default PostSkeleton;
