import { COLOR, REL } from "@/styles/ColorStyles";
import { DeviceSize } from "@/styles/DeviceSize";
import { FONT12, FONT14, FONT16 } from "@/styles/FontStyles";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

Badge.propTypes = {
  children: PropTypes.string,
  num: PropTypes.number,
};
function Badge({ children, num }) {
  switch (children) {
    case REL.O:
      return makeBadge(children, COLOR.O);
    case REL.P:
      return makeBadge(children, COLOR.P);
    case REL.B:
      return makeBadge(children, COLOR.B);
    case REL.G:
      return makeBadge(children, COLOR.G);
    case REL.R:
      return makeBadge(children, COLOR.R);
    default:
      return makeEmoji(children, num);
  }
}

const makeBadge = (children, color) => {
  const COLOR_CSS = css`
    background-color: var(--${color}1);
    color: var(--${color}${color === COLOR.P ? 6 : 5});
  `;
  return <Container color={COLOR_CSS}>{children}</Container>;
};

const makeEmoji = (children, num) => {
  return (
    <Container__Emoji>
      {children}
      <span>{num}</span>
    </Container__Emoji>
  );
};

export default Badge;

const Container = styled.div`
  width: 4.2rem;
  height: 2rem;

  padding: 0 0.8rem;
  border-radius: 0.4rem;

  display: flex;
  align-items: center;
  grid-area: badge;

  ${FONT14};
  ${({ color }) => color};
`;

const Container__Emoji = styled.div`
  width: 6.6rem;
  height: 3.6rem;

  padding: 0.8rem 1.2rem;
  border-radius: 3.2rem;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #00000080;

  ${FONT16};

  span {
    margin-left: 0.4rem;

    ${FONT16}
    color: var(--White);
  }

  @media screen and (max-width: ${DeviceSize.mobile}) {
    width: 5.2rem;
    height: 2.8rem;

    padding: 0.4rem 0.8rem;

    ${FONT12};
  }
`;
