import styled from 'styled-components';

interface ITag {
  color: string;
}

export const Container = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: relative;

  background-color: ${(props) => props.theme.colors.tertiary};

  list-style: none;
  border-radius: 5px;

  margin: 10px 0;
  padding: 12px 10px;

  cursor: pointer;

  transition: all 0.3s;

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
`;

export const Tag = styled.div<ITag>`
  width: 10px;
  height: 60%;

  position: absolute;
  left: 0;

  background-color: ${(props) => props.color};
`;
