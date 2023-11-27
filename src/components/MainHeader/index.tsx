import { useMemo, useState } from 'react';

import { useTheme } from '../../hooks/theme';
import Toggle from '../Toggle';

import emojis from '../../utils/emojis';

import { Container, Profile, Welcome, UserName } from './styles';

const MainHeader = () => {
  const { toggleTheme, theme } = useTheme();

  const [darkTheme, setDarkTheme] = useState(() =>
    theme.title === 'dark' ? true : false
  );

  const handleChangeTheme = () => {
    setDarkTheme(!darkTheme);

    toggleTheme();
  };

  const emoji = useMemo(() => {
    const index = Math.floor(Math.random() * emojis.length);

    return emojis[index];
  }, []);

  return (
    <Container>
      <Toggle
        labelLeft="Light"
        labelRight="Dark"
        checked={darkTheme}
        onChange={handleChangeTheme}
      />

      <Profile>
        <Welcome>Olá, {emoji}</Welcome>
        <UserName>Stevan Padilha</UserName>
      </Profile>
    </Container>
  );
};
export default MainHeader;
