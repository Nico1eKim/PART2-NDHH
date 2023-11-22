import iconBlack from "@/assets/add-24-black.svg";
import iconWhite from "@/assets/add-24-white.svg";
import arrowLeft from "@/assets/arrow_left.svg";
import arrowRight from "@/assets/arrow_right.svg";
import deleteBlack from "@/assets/deleted_black.svg";
import deleteWhite from "@/assets/deleted_white.svg";
import plusIcon from "@/assets/plus.svg";
import redo from "@/assets/redo.svg";
import { HEIGHTS, TYPES } from "@/styles/ButtonStyles";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

Button.propTypes = {
  width: PropTypes.string,
  height: PropTypes.oneOf(["xl", "l", "m", "s"]),
  type: PropTypes.oneOf(["primary", "secondary", "outlined", "plus", "trash", "redo", "arrowRight", "arrowLeft", "error"]),
  disabled: PropTypes.bool,
  icon: PropTypes.bool,
  children: PropTypes.node,
};

function Button({ width, height, type, disabled, icon, children, ...props }) {
  const heights = HEIGHTS[height];
  const types = TYPES[type];
  const iconFace = disabled ? iconWhite : iconBlack;
  const deleteIcon = disabled ? deleteWhite : deleteBlack;

  return (
    <Container $width={width} $heights={heights} $types={types} $disabled={disabled} {...props}>
      {icon && <IconFace src={iconFace} alt="이모티콘 추가하기" $heights={height} />}
      {type === "plus" && <IconSmall src={plusIcon} alt="롤링페이퍼 만들기" />}
      {type === "trash" && <IconSmall src={deleteIcon} alt="롤링페이퍼 삭제하기" />}
      {type === "redo" && <IconSmall src={redo} alt="삭제한 메시지 되돌리기" />}
      {type === "arrowRight" && <IconLarge src={arrowRight} alt="목록 오른쪽으로 넘기기" />}
      {type === "arrowLeft" && <IconLarge src={arrowLeft} alt="목록 첫번째로 돌아가기" />}
      {children}
    </Container>
  );
}

export default Button;

const Container = styled.button`
  ${({ $heights }) => $heights}
  ${({ $types }) => $types}

  ${({ $width }) => ($width ? `width: ${$width / 10}rem;` : "width: 100%;")}
  padding: var(--padding);
  border: 0.1rem solid var(--border-color);
  border-radius: var(--border-radius);

  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;

  background: var(--bg-color);

  color: var(--color);
  font-family: "Noto Sans KR";

  &:hover {
    border: 0.1rem solid var(--hover-border-color);

    background: var(--hover-bg-color);

    color: var(--hover-color);
  }

  &:active {
    border: 0.1rem solid var(--pressed-border-color);

    background: var(--pressed-bg-color);

    color: var(--pressed-color);
  }

  ${({ $disabled }) =>
    $disabled &&
    css`
      border: 0.1rem solid var(--Gray3);

      background: var(--Gray3);

      color: var(--White);

      pointer-events: none;
    `}
`;

const IconFace = styled.img`
  ${({ $heights }) => $heights}

  width: var(--img-width);
  height: var(--img-height);
`;

const IconSmall = styled.img`
  width: 2.4rem;
  height: 2.4rem;
`;

const IconLarge = styled.img`
  width: 4rem;
  height: 4rem;

  filter: drop-shadow(0 0.4rem 0.8rem rgba(0, 0, 0, 0.08));
`;
