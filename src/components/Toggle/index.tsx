import { Container, ToggleLabel, ToggleSelctor } from './styles';

const Toggle = () => {
  return (
    <Container>
      <ToggleLabel>Light</ToggleLabel>
      <ToggleSelctor
        checked
        onChange={() => {
          console.log('Mudou');
        }}
        uncheckedIcon={false}
        checkedIcon={false}
      />
      <ToggleLabel>Dark</ToggleLabel>
    </Container>
  );
};

export default Toggle;
