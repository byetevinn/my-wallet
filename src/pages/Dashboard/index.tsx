import { useMemo, useState } from 'react';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';

import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';
import lisOfMonths from '../../utils/months';

import { Container, Content } from './styles';
import WalletBox from '../../components/WalletBox';

const Dashboard = () => {
  const [monthSelected, setMonthSelected] = useState<number>(
    new Date().getMonth() + 1
  );
  const [yearSelected, setYearSelected] = useState<number>();

  const months = useMemo(() => {
    return lisOfMonths.map((month, index) => {
      return {
        value: index + 1,
        label: month,
      };
    });
  }, []);

  const years = useMemo(() => {
    let uniqueYears: number[] = [];

    [...expenses, ...gains].forEach(({ date }) => {
      const newDate = new Date(date);
      const year = newDate.getFullYear();

      if (!uniqueYears.includes(year)) {
        uniqueYears.push(year);
      }
    });

    setYearSelected(Math.max(...uniqueYears));

    return uniqueYears.map((year) => {
      return {
        value: year,
        label: year,
      };
    });
  }, []);

  return (
    <Container>
      <ContentHeader title="Dashboard" linecolor="#F7931B">
        <SelectInput
          options={months}
          onChange={(e) => setMonthSelected(Number(e.target.value))}
          defaultValue={monthSelected}
        />
        <SelectInput
          options={years}
          onChange={(e) => setYearSelected(Number(e.target.value))}
          defaultValue={yearSelected}
        />
      </ContentHeader>

      <Content>
        <WalletBox
          title="Saldo"
          color="#4E41F0"
          amount={150.0}
          footerLabel="Atualizado com base nas entradas e saídas"
          icon="dollar"
        />
        <WalletBox
          title="Entradas"
          color="#F7931B"
          amount={5000.0}
          footerLabel="Atualizado com base nas entradas e saídas"
          icon="arrowUp"
        />
        <WalletBox
          title="Saídas"
          color="#E44C4E"
          amount={4850.0}
          footerLabel="Atualizado com base nas entradas e saídas"
          icon="arrowDown"
        />
      </Content>
    </Container>
  );
};

export default Dashboard;
