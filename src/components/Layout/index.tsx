import { ReactNode } from 'react';

import Aside from '../Aside';
import Content from '../Content';
import MainHeader from '../MainHeader';

import { Container } from './styles';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Container>
      <MainHeader />
      <Aside />
      <Content>{children}</Content>
    </Container>
  );
};
export default Layout;
