import { useMemo } from 'react';

import emojis from '../../utils/emojis';

import { Container, Profile, Welcome, UserName } from './styles';
import Toggle from '../Toggle';

const MainHeader = () => {
  const emoji = useMemo(() => {
    const index = Math.floor(Math.random() * emojis.length);

    return emojis[index];
  }, []);

  return (
    <Container>
      <Toggle />

      <Profile>
        <Welcome>Olá, {emoji}</Welcome>
        <UserName>Stevan Padilha</UserName>
      </Profile>
    </Container>
  );
};
export default MainHeader;
