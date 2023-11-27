import { ReactNode } from 'react';

import { Container } from './styles';

const Content = ({ children }: { children: ReactNode }) => (
  <Container>{children}</Container>
);

export default Content;
