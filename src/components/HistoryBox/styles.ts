import styled from 'styled-components';

interface ILegend {
  color: string;
}

export const Container = styled.div`
  width: 100%;

  background-color: ${(props) => props.theme.colors.tertiary};
  color: ${(props) => props.theme.colors.white};

  margin: 10px 0;
  padding: 30px 20px;

  border-radius: 7px;
`;

export const ChartContainer = styled.div`
  flex: 1;

  height: 260px;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;

  width: 100%;

  > h2 {
    padding-left: 20px;

    margin-bottom: 20px;
  }

  @media (max-width: 1200px) {
    flex-direction: column;
  }
`;

export const LegendContainer = styled.ul`
  display: flex;

  padding-right: 20px;
`;

export const Legend = styled.li<ILegend>`
  display: flex;
  align-items: center;

  font-size: 16px;

  margin-bottom: 7px;
  margin-left: 20px;

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

  @media (max-width: 1280px) {
    > div {
      width: 30px;
      height: 30px;
    }
  }
`;
