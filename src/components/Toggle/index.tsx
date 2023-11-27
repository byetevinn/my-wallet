import { Container, ToggleLabel, ToggleSelctor } from './styles';

interface IToggle {
  labelLeft: string;
  labelRight: string;
  checked: boolean;
  onChange(): void;
}

const Toggle = ({ labelLeft, labelRight, checked, onChange }: IToggle) => (
  <Container>
    <ToggleLabel> {labelLeft} </ToggleLabel>
    <ToggleSelctor
      checked={checked}
      uncheckedIcon={false}
      checkedIcon={false}
      onChange={onChange}
    />
    <ToggleLabel> {labelRight} </ToggleLabel>
  </Container>
);

export default Toggle;
