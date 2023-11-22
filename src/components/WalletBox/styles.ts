import styled from 'styled-components';

interface IContainer {
  color: string;
}

export const Container = styled.div<IContainer>`
  position: relative;

  width: 32%;
  height: 150px;

  background-color: ${(props) => props.color};
  color: ${(props) => props.theme.colors.white};

  overflow: hidden;

  border-radius: 7px;

  margin: 10px 0;
  padding: 10px 20px;

  > img {
    position: absolute;
    top: -10px;
    right: -30px;

    height: 110%;

    opacity: 0.3;
  }

  > span {
    font-size: 18px;
    font-weight: 500;
  }

  > small {
    position: absolute;

    font-size: 12px;

    bottom: 10px;
  }
`;
