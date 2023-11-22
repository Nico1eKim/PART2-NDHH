import arrowDown from "@/assets/arrow_down.svg";
import arrowUp from "@/assets/arrow_top.svg";
import { FONT16 } from "@/styles/FontStyles";
import PropTypes from "prop-types";
import { useState } from "react";
import styled, { css } from "styled-components";

Dropdown.propTypes = {
  disabled: PropTypes.bool,
  font: PropTypes.bool,
};

function Dropdown({ disabled, value, setValue, items }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [arrowDirection, setArrowDirection] = useState(arrowDown);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    setArrowDirection(showDropdown ? arrowDown : arrowUp);
  };

  const handleBlur = (event) => {
    if (!event.relatedTarget || event.relatedTarget.tagName !== "LI") {
      setShowDropdown(false);
      setArrowDirection(arrowDown);
    }
  };

  const handleSelect = (item) => () => {
    setValue(item);
    setShowDropdown(false);
    setArrowDirection(arrowDown);
  };

  const handleKeyDown = (item) => (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setValue(item);
      setShowDropdown(false);
      setArrowDirection(arrowDown);
      return;
    }
  };

  return (
    <Container disabled={disabled}>
      <Wrapper onClick={toggleDropdown} onBlur={handleBlur}>
        {value ?? items[0]}
        <ArrowImg src={arrowDirection} alt="클릭해서 옵션 선택하기" />
      </Wrapper>
      {showDropdown && (
        <List autoFocus={true}>
          {items.map((item, idx) => (
            <Text tabIndex={0} key={idx} onClick={handleSelect(item)} onKeyDown={handleKeyDown(item)}>
              {item}
            </Text>
          ))}
        </List>
      )}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
`;

const Wrapper = styled.button`
  position: relative;
  width: 32rem;
  height: 5rem;
  padding: 1.2rem 1.6rem;
  border-radius: 0.8rem;
  border: 0.1rem solid var(--Gray3);
  background: var(--White);

  text-align: left;
  ${FONT16}
  color: var(--Gray5);

  &:hover {
    border: 0.1rem solid var(--Gray5);
  }

  &:active {
    border: 0.2rem solid var(--Gray7);
    color: var(--Gray9);
  }

  &:focus {
    border: 0.2rem solid var(--Gray5);
    outline: none;
    color: var(--Gray9);
  }

  ${(props) =>
    props.disabled &&
    css`
      pointer-events: none;
      border: 0.1rem solid var(--Gray3);
      background: var(--Gray1);
      color: var(--Gray4);
    `}
`;

const ArrowImg = styled.img`
  position: absolute;
  top: 1.6rem;
  right: 1.6rem;

  width: 1.6rem;
  height: 1.6rem;
`;

const List = styled.ul`
  display: block;
  width: 32rem;
  position: absolute;
  top: 5.8rem;
  left: 0;
  padding: 1rem 0.1rem;

  border-radius: 0.8rem;
  border: 0.1rem solid var(--Gray3);
  background: var(--White);
  box-shadow: 0 0.2rem 1.2rem 0 rgba(0, 0, 0, 0.08);
  z-index: 1;
`;

const Text = styled.li`
  width: 31.6rem;
  padding: 1.2rem 1.6rem;

  display: flex;
  align-items: center;

  &:hover {
    background: var(--Gray1);
  }

  ${FONT16}
`;

export default Dropdown;
