import { Container } from './styles';

interface ISelectInput {
  options: {
    value: string | number;
    label: string | number;
  }[];
  onChange(event: React.ChangeEvent<HTMLSelectElement>): void | undefined;
  defaultValue?: string | number;
}

const SelectInput = ({ options, onChange, defaultValue }: ISelectInput) => (
  <Container>
    <select onChange={onChange} defaultValue={defaultValue}>
      {options.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  </Container>
);

export default SelectInput;
