import React from 'react';

import Aside from '../Aside';
import Content from '../Content';
import MainHeader from '../Layout';

import { Container } from './styles';

const Layout: React.FC = () => {
  return (
    <Container>
      <MainHeader />
      <Aside />
      <Content />
    </Container>
  );
};
export default Layout;
