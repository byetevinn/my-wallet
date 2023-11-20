import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  grid-area: MH;

  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.secondary};

  padding: 0px 10px;

  border-bottom: 1px solid ${(props) => props.theme.colors.gray};
`;

export const Profile = styled.div`
  color: ${(props) => props.theme.colors.white};
`;

export const Welcome = styled.div``;

export const UserName = styled.div``;
