import styled from "styled-components";
import { useThemeContext } from "./themeContext";

const Container = styled.button`
  z-index: 10000;

  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 4%;
  left: 3%;

  width: 48px;
  height: 24px;
  font-size: 9px;

  background-color: ${(props) => props.theme.bgColor};
  border-radius: 15px;
  color: ${(props => props.theme.textColor)};
  transition: background-color 0.2s ease-out 0s;
`;

const ToggleSwitch = () => {
  const { theme, toggleTheme } = useThemeContext();
  return (
    <Container onClick={toggleTheme}>
      {theme === "dark" ? "Dark" : "Light"}
    </Container>
  );
};

export default ToggleSwitch;
