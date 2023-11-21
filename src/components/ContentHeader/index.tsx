import { ReactNode } from 'react';

import { Container, TitleContainer, Controllers } from './styles';

interface IContentHeader {
  title: string;
  lineColor: string;
  children: ReactNode;
}

const ContentHeader = ({ title, lineColor, children }: IContentHeader) => {
  return (
    <Container>
      <TitleContainer lineColor={lineColor}>
        <h1> {title} </h1>
      </TitleContainer>
      <Controllers>{children}</Controllers>
    </Container>
  );
};
export default ContentHeader;
