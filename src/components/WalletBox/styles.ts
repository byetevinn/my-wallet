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

  @media (max-width: 770px) {
    > span {
      font-size: 14px;
    }

    > h1 {
      word-wrap: break-word;
      font-size: 22px;

      strong {
        display: inline-block;

        width: 100%;

        font-size: 16px;
      }
    }
  }

  @media (max-width: 420px) {
    width: 100%;

    > h1 {
      display: flex;

      strong {
        display: initial;

        width: auto;

        font-size: 22px;
      }

      strong::after {
        display: inline-block;
        content: ' ';
      }
    }
  }
`;
