import { useState } from 'react';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/auth';

import logoImg from '../../assets/logo.svg';

import { Container, Logo, Form, FormTitle } from './styles';

const SignIn = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const { signIn } = useAuth();

  return (
    <Container>
      <Logo>
        <img src={logoImg} alt="Minha Carteira" />
        <h2>Minha Carteira</h2>
      </Logo>

      <Form
        onSubmit={(e) => {
          e.preventDefault();

          signIn(email!, password!);
        }}
      >
        <FormTitle>Entrar</FormTitle>

        <Input
          required
          type="email"
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          required
          type="password"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit"> Acessar </Button>
      </Form>
    </Container>
  );
};

export default SignIn;
