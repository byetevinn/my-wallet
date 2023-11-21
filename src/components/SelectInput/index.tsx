import { Container } from './styles';

interface ISelectInput {
  options: {
    value: string | number;
    label: string | number;
  }[];
}

const SelectInput = ({ options }: ISelectInput) => {
  return (
    <Container>
      <select>
        {options.map(({ value, label }) => (
          <option value={value}> {label} </option>
        ))}
      </select>
    </Container>
  );
};

export default SelectInput;
