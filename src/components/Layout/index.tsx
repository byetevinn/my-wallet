import Aside from '../Aside';
import Content from '../Content';
import MainHeader from '../MainHeader';

import { Container } from './styles';

const Layout = () => {
  return (
    <Container>
      <MainHeader />
      <Aside />
      <Content />
    </Container>
  );
};
export default Layout;
