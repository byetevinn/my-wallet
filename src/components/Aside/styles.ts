import styled, { css } from 'styled-components';

interface IContainer {
  menuIsOpen: boolean;
}

interface IThemeToggleFooter {
  menuIsOpen: boolean;
}

export const Container = styled.div<IContainer>`
  grid-area: AS;

  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.secondary};

  padding-left: 20px;

  border-right: 1px solid ${(props) => props.theme.colors.gray};

  position: relative;

  @media (max-width: 600px) {
    padding-left: 20px;
    position: fixed;
    z-index: 2;

    width: 170px;
    height: ${(props) => (props.menuIsOpen ? '100vh' : '70px')};

    overflow: hidden;

    ${(props) =>
      !props.menuIsOpen &&
      css`
        border: none;
        border-bottom: 1px solid ${(props) => props.theme.colors.gray};
      `}
  }
`;

export const Header = styled.header`
  display: flex;
  align-items: center;

  height: 70px;
`;

export const LogImg = styled.img`
  width: 40px;
  height: 40px;

  @media (max-width: 600px) {
    display: none;
  }
`;

export const Title = styled.h3`
  color: ${(props) => props.theme.colors.white};

  margin-left: 10px;

  @media (max-width: 600px) {
    display: none;
  }
`;

export const MenuContainer = styled.nav`
  display: flex;
  flex-direction: column;

  margin-top: 50px;
`;

export const MenuItemLink = styled.a`
  display: flex;
  align-items: center;

  color: ${(props) => props.theme.colors.info};
  text-decoration: none;

  margin: 7px 0;

  transition: opacity 0.3s;

  &:hover {
    opacity: 0.7;
  }

  > svg {
    font-size: 18px;
    margin-right: 5px;
  }
`;

export const MenuItemButton = styled.button`
  display: flex;
  align-items: center;

  font-size: 16px;

  background: none;
  color: ${(props) => props.theme.colors.info};
  text-decoration: none;

  margin: 7px 0;

  transition: opacity 0.3s;

  &:hover {
    opacity: 0.7;
  }

  > svg {
    font-size: 18px;
    margin-right: 5px;
  }
`;

export const ToggleMenu = styled.button`
  display: none;

  width: 40px;
  height: 40px;

  font-size: 22px;

  background-color: ${(props) => props.theme.colors.warning};
  color: ${(props) => props.theme.colors.white};

  border-radius: 5px;

  transition: opacity 0.3s;

  &:hover {
    opacity: 0.7;
  }

  @media (max-width: 600px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const ThemeToggleFooter = styled.footer<IThemeToggleFooter>`
  display: none;
  position: absolute;
  bottom: 30px;

  width: 30px;
  height: 30px;

  @media (max-width: 600px) {
    display: ${(props) => (props.menuIsOpen ? 'flex' : 'none')};
  }
`;
