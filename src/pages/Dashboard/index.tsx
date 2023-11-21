import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';

import { Container } from './styles';

const Dashboard = () => {
  const options = [
    {
      value: 'Stevan',
      label: 'Stevan',
    },
    {
      value: 'Carlos',
      label: 'Carlos',
    },
    {
      value: 'Matheus',
      label: 'Matheus',
    },
  ];

  return (
    <Container>
      <ContentHeader title="Dashboard" linecolor="#F7931B">
        <SelectInput options={options} onChange={() => {}}></SelectInput>
      </ContentHeader>
    </Container>
  );
};

export default Dashboard;
