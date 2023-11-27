import { InputHTMLAttributes } from 'react';
import { Container } from './styles';

type IInput = InputHTMLAttributes<HTMLInputElement>;

const Input = ({ ...rest }: IInput) => <Container {...rest} />;

export default Input;
