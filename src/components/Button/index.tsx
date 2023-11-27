import { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type IButton = ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, ...rest }: IButton) => (
  <Container {...rest}> {children} </Container>
);

export default Button;
