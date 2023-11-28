import styled from 'styled-components';

interface ILegend {
  color: string;
}

export const Container = styled.div`
  display: flex;

  width: 48%;
  min-height: 260px;

  background-color: ${(props) => props.theme.colors.tertiary};
  color: ${(props) => props.theme.colors.white};

  margin: 10px 0;

  border-radius: 7px;

  @media (max-width: 1200px) {
    flex-direction: column;

    width: 100%;
    height: auto;
  }
`;

export const SideLeft = styled.aside`
  flex: 1;

  padding: 30px 20px;

  > h2 {
    padding-left: 16px;
    margin-bottom: 10px;
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

  @media (max-width: 1200px) {
    display: flex;

    height: auto;
  }
`;

export const Legend = styled.li<ILegend>`
  display: flex;
  align-items: center;

  font-size: 16px;

  margin-bottom: 7px;

  padding-left: 16px;

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
`;

export const SideRight = styled.main`
  flex: 1;

  min-height: 150px;

  display: flex;
  justify-content: center;

  padding-top: 35px;
`;
