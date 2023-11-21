import styled from 'styled-components';

interface ITitleContainer {
  linecolor: string;
}

export const Container = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;

  margin-bottom: 25px;
`;

export const TitleContainer = styled.div<ITitleContainer>`
  > h1 {
    color: ${(props) => props.theme.colors.white};

    &::after {
      content: '';
      display: block;
      width: 55px;
      border-bottom: 10px solid ${(props) => props.linecolor};
    }
  }
`;

export const Controllers = styled.div`
  display: flex;
`;
