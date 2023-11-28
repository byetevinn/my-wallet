import styled, { keyframes } from 'styled-components';

interface ITag {
  color: string;
}

const animate = keyframes`
  0% {
    transform: translateX(-100px);
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

export const Container = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: relative;

  background-color: ${(props) => props.theme.colors.tertiary};

  border-radius: 10px;

  margin: 10px 0;
  padding: 12px 10px;

  cursor: pointer;

  transition: all 0.3s;

  animation: ${animate} 0.5s ease;

  &:hover {
    opacity: 0.7;
    transform: translate(10px);
  }

  > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    padding-left: 10px;
  }

  > div span {
    font-weight: 500;
    font-size: 22px;
  }
`;

export const Tag = styled.div<ITag>`
  width: 10px;
  height: 60%;

  position: absolute;
  left: 0;

  background-color: ${(props) => props.color};
`;
