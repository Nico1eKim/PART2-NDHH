import { SELECTED } from "@/styles/ButtonStyles";
import { COLOR } from "@/styles/ColorStyles";
import { FONT16, FONT16B } from "@/styles/FontStyles";
import PropTypes from "prop-types";
import { useCallback } from "react";
import styled from "styled-components";

ToggleButton.propTypes = {
  handleToggle: PropTypes.func,
  selected: PropTypes.string,
};

function ToggleButton({ handleToggle, selected }) {
  const handleTypeChange = useCallback((type) => () => handleToggle(type), [handleToggle]);

  const Toggle = useCallback(
    ({ type }) => (
      <Button onClick={handleTypeChange(type)} selected={selected === type}>
        {type}
      </Button>
    ),
    [handleTypeChange, selected]
  );

  return (
    <Container>
      <Toggle type={SELECTED.color} />
      <Toggle type={SELECTED.image} />
    </Container>
  );
}

export default ToggleButton;

const Container = styled.div`
  display: flex;
  flex-direction: row;

  width: 24.4rem;
  height: 4rem;

  border-radius: 0.6rem;

  background-color: var(--Gray1);
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;

  border-radius: 0.6rem;
  border: 2px solid;

  padding: ${(props) => (props.selected ? "0.7rem 1.6rem" : "0.8rem 1.6rem")};

  ${(props) => (props.selected ? `${FONT16B}` : `${FONT16}`)};

  border-color: ${(props) => (props.selected ? `var(--${COLOR.P}6)` : "var(--Gray1)")};
  background-color: ${(props) => (props.selected ? "var(--White)" : "transparent")};
  color: ${(props) => (props.selected ? `var(--${COLOR.P}7)` : "var(--Gray9)")};
`;
