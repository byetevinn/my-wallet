import { ReactNode } from 'react';

import { Container, TitleContainer, Controllers } from './styles';

interface IContentHeader {
  title: string;
  linecolor: string;
  children: ReactNode;
}

const ContentHeader = ({ title, linecolor, children }: IContentHeader) => (
  <Container>
    <TitleContainer linecolor={linecolor}>
      <h1> {title} </h1>
    </TitleContainer>
    <Controllers>{children}</Controllers>
  </Container>
);

export default ContentHeader;
