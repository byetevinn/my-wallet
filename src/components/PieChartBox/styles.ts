import styled, { keyframes } from 'styled-components';

interface ILegend {
  color: string;
}

const animate = keyframes`
  0% {
    transform: translateX(100px);
    opacity: 0;
  }
  50% {
    opacity: 0.3;
  }
  100% {
    transform: translateX(0px);
    opacity: 1;
  }
`;

export const Container = styled.div`
  display: flex;

  width: 48%;
  height: 260px;

  background-color: ${(props) => props.theme.colors.tertiary};

  margin: 10px 0;

  border-radius: 7px;

  animation: ${animate} 0.5s;

  @media (max-width: 770px) {
    width: 100%;
  }
`;

export const SideLeft = styled.aside`
  padding: 30px 20px;

  > h2 {
    margin-bottom: 20px;
  }

  @media (max-width: 1345px) {
    padding: 0 15px 5px;

    > h2 {
      margin-top: 15px;
      margin-bottom: 7px;
    }
  }

  @media (max-width: 420px) {
    margin-top: 15px;
    margin-bottom: 7px;
  }
`;

export const LegendContainer = styled.ul`
  height: 175px;

  overflow-y: scroll;

  padding-right: 15px;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.secondary};
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background-color: ${(props) => props.theme.colors.tertiary};
  }

  @media (max-width: 1345px) {
    display: flex;
    flex-direction: column;
  }
`;

export const Legend = styled.li<ILegend>`
  display: flex;
  align-items: center;

  font-size: 16px;

  margin-bottom: 7px;

  > div {
    width: 40px;
    height: 40px;

    line-height: 40px;
    text-align: center;

    font-size: 14px;

    background-color: ${(props) => props.color};

    border-radius: 5px;
  }

  > span {
    margin-left: 5px;
  }

  @media (max-width: 1345px) {
    font-size: 14px;
    margin: 3px 0;

    > div {
      width: 35px;
      height: 35px;
      line-height: 35px;
    }

    > span {
      margin-left: 7px;
    }
  }
`;

export const SideRight = styled.main`
  display: flex;
  flex: 1;
  justify-content: center;

  @media (max-width: 1345px) {
    height: 100%;
  }
`;
