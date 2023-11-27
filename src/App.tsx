import { ThemeProvider } from 'styled-components';

import { useTheme } from './hooks/theme';

import GlobalStyles from './styles/GlobalStyles';
import Routes from './routes';

const App = () => {
  const { theme } = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Routes />
    </ThemeProvider>
  );
};

export default App;
