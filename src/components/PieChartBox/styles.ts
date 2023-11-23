import styled from 'styled-components';

interface ILegend {
  color: string;
}

export const Container = styled.div`
  display: flex;

  width: 48%;
  height: 260px;

  background-color: ${(props) => props.theme.colors.tertiary};

  margin: 10px 0;

  border-radius: 7px;
`;

export const SideLeft = styled.aside`
  padding: 30px 20px;

  > h2 {
    margin-bottom: 20px;
  }
`;

export const LegendContainer = styled.ul`
  height: 175px;

  list-style: none;

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
`;

export const SideRight = styled.main`
  display: flex;
  flex: 1;
  justify-content: center;
`;
