import { useMemo, useState } from 'react';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import WalletBox from '../../components/WalletBox';
import MessageBox from '../../components/MessageBox';
import PieChartBox from '../../components/PieChartBox';
import HistoryBox from '../../components/HistoryBox';

import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';
import lisOfMonths from '../../utils/months';

import relievedImg from '../../assets/relieved.svg';
import happyImg from '../../assets/happy.svg';
import sadImg from '../../assets/sad.svg';

import { Container, Content } from './styles';

const Dashboard = () => {
  const [monthSelected, setMonthSelected] = useState<number>(
    new Date().getMonth() + 1
  );
  const [yearSelected, setYearSelected] = useState<number>(
    new Date().getFullYear()
  );

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

    return uniqueYears.map((year) => {
      return {
        value: year,
        label: year,
      };
    });
  }, []);

  const totalExpenses = useMemo(() => {
    let total = 0;

    expenses.forEach(({ date, amount }) => {
      const newDate = new Date(date);
      const year = newDate.getFullYear();
      const month = newDate.getMonth() + 1;

      if (month === monthSelected && year === yearSelected) {
        try {
          total += Number(amount);
        } catch {
          throw new Error('Invalid amount! Amount must be number');
        }
      }
    });

    return total;
  }, [monthSelected, yearSelected]);

  const totalGains = useMemo(() => {
    let total = 0;

    gains.forEach(({ date, amount }) => {
      const newDate = new Date(date);
      const year = newDate.getFullYear();
      const month = newDate.getMonth() + 1;

      if (month === monthSelected && year === yearSelected) {
        try {
          total += Number(amount);
        } catch {
          throw new Error('Invalid amount! Amount must be number');
        }
      }
    });

    return total;
  }, [monthSelected, yearSelected]);

  const totalBalance = useMemo(() => {
    return totalGains - totalExpenses;
  }, [monthSelected, yearSelected]);

  const message = useMemo(() => {
    if (totalBalance < 0) {
      return {
        title: 'Que triste!',
        description: 'Neste mês, você gastou mais do que deveria.',
        footerText:
          'Verifique seus gastois e tente cortar algumas coisas desnecessárias.',
        icon: sadImg,
      };
    } else if (totalBalance === 0) {
      return {
        title: 'Ufaa!',
        description: 'Neste mês, você gastou exatamente o que ganhou.',
        icon: relievedImg,
        footerText:
          'Tenha cuidado. No próximo mês tente poupar o seu dinheiro.',
      };
    } else
      return {
        title: 'Muito bem!',
        description: 'Sua carteira está positiva!',
        icon: happyImg,
        footerText: 'Continue assim. Considere investir o seu saldo.',
      };
  }, [monthSelected, yearSelected]);

  const relationExpensesVersusGains = useMemo(() => {
    const total = totalGains + totalExpenses;

    const percentGains = (totalGains / total) * 100;
    const percentExpenses = (totalExpenses / total) * 100;

    const data = [
      {
        name: 'Entradas',
        value: totalExpenses,
        percent: Number(percentGains.toFixed(1)),
        color: '#F7931B',
      },
      {
        name: 'Saídas',
        value: totalExpenses,
        percent: Number(percentExpenses.toFixed(1)),
        color: '#E44C4E',
      },
    ];

    return data;
  }, [totalGains, totalExpenses]);

  const historyData = useMemo(() => {
    return lisOfMonths
      .map((_, month) => {
        let amountEntry = 0;

        gains.forEach(({ date, amount }) => {
          const newDate = new Date(date);
          const gainMonth = newDate.getMonth();
          const gainYear = newDate.getFullYear();

          if (gainMonth === month && gainYear === yearSelected) {
            try {
              amountEntry += Number(amount);
            } catch {
              throw new Error(
                'amountEntry is invalid. amountEntry must be valid number.'
              );
            }
          }
        });

        let amountOutput = 0;

        expenses.forEach(({ date, amount }) => {
          const newDate = new Date(date);
          const expenseYear = newDate.getFullYear();
          const expenseMonth = newDate.getMonth();

          if (expenseMonth === month && expenseYear === yearSelected) {
            try {
              amountOutput += Number(amount);
            } catch {
              throw new Error(
                'amountOutput is invalid. amountOutput must be valid number.'
              );
            }
          }
        });

        return {
          monthNumber: month,
          month: lisOfMonths[month].substring(0, 3),
          amountEntry,
          amountOutput,
        };
      })
      .filter(({ monthNumber }) => {
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        return (
          (yearSelected === currentYear && monthNumber <= currentMonth) ||
          yearSelected < currentYear
        );
      });
  }, [yearSelected]);

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
          amount={totalBalance}
          footerLabel="Atualizado com base nas entradas e saídas"
          icon="dollar"
        />
        <WalletBox
          title="Entradas"
          color="#F7931B"
          amount={totalGains}
          footerLabel="Atualizado com base nas entradas e saídas"
          icon="arrowUp"
        />
        <WalletBox
          title="Saídas"
          color="#E44C4E"
          amount={totalExpenses}
          footerLabel="Atualizado com base nas entradas e saídas"
          icon="arrowDown"
        />

        <MessageBox
          title={message.title}
          description={message.description}
          icon={message.icon}
          footerText={message.footerText}
        />

        <PieChartBox data={relationExpensesVersusGains} />

        <HistoryBox
          data={historyData}
          lineColorAmountEntry="#F7931B"
          lineColorAmountOutput="#E44C4E"
        />
      </Content>
    </Container>
  );
};

export default Dashboard;
