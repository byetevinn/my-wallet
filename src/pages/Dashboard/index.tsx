import { useCallback, useMemo, useState } from 'react';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import WalletBox from '../../components/WalletBox';
import MessageBox from '../../components/MessageBox';
import PieChartBox from '../../components/PieChartBox';
import HistoryBox from '../../components/HistoryBox';
import BarChartBox from '../../components/BarChartBox';

import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';
import lisOfMonths from '../../utils/months';

import relievedImg from '../../assets/relieved.svg';
import happyImg from '../../assets/happy.svg';
import sadImg from '../../assets/sad.svg';
import thinkingImg from '../../assets/thinking.svg';

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
    } else if (totalGains === 0 && totalExpenses === 0) {
      return {
        title: 'Ops!',
        description: 'Neste mês, não há registros de entradas ou saídas.',
        icon: thinkingImg,
        footerText:
          'Parece que você não fez nenhum registro no mês e ano selecionado.',
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
  }, [totalBalance, totalGains, totalExpenses]);

  const relationExpensesVersusGains = useMemo(() => {
    const total = totalGains + totalExpenses;

    const percentGains = Number(((totalGains / total) * 100).toFixed(1));
    const percentExpenses = Number(((totalExpenses / total) * 100).toFixed(1));

    const data = [
      {
        name: 'Entradas',
        value: totalGains,
        percent: percentGains ? percentGains : 0,
        color: '#F7931B',
      },
      {
        name: 'Saídas',
        value: totalExpenses,
        percent: percentExpenses ? percentExpenses : 0,
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

  const relationExpensevesRecurrentVersusEventual = useMemo(() => {
    let amountRecurrent = 0;
    let amountEventual = 0;

    expenses
      .filter(({ date }) => {
        const newDate = new Date(date);
        const year = newDate.getFullYear();
        const month = newDate.getMonth() + 1;

        return month === monthSelected && year === yearSelected;
      })
      .forEach(({ amount, frequency }) => {
        if (frequency === 'recorrente') amountRecurrent += Number(amount);

        if (frequency === 'eventual') amountEventual += Number(amount);
      });

    const total = amountRecurrent + amountEventual;

    const percentRecurrent = Number(
      ((amountRecurrent / total) * 100).toFixed(1)
    );
    const percentEventual = Number(((amountEventual / total) * 100).toFixed(1));

    return [
      {
        name: 'Recorrentes',
        amount: amountRecurrent,
        percent: percentRecurrent ? percentRecurrent : 0,
        color: '#F7931B',
      },
      {
        name: 'Eventuais',
        amount: amountEventual,
        percent: percentEventual ? percentEventual : 0,
        color: '#E44C4E',
      },
    ];
  }, [monthSelected, yearSelected]);

  const relationGainsRecurrentVersusEventual = useMemo(() => {
    let amountRecurrent = 0;
    let amountEventual = 0;

    gains
      .filter(({ date }) => {
        const newDate = new Date(date);
        const year = newDate.getFullYear();
        const month = newDate.getMonth() + 1;

        return month === monthSelected && year === yearSelected;
      })
      .forEach(({ amount, frequency }) => {
        if (frequency === 'recorrente') amountRecurrent += Number(amount);

        if (frequency === 'eventual') amountEventual += Number(amount);
      });

    const total = amountRecurrent + amountEventual;

    const percentRecurrent = Number(
      ((amountRecurrent / total) * 100).toFixed(1)
    );
    const percentEventual = Number(((amountEventual / total) * 100).toFixed(1));

    return [
      {
        name: 'Recorrentes',
        amount: amountRecurrent,
        percent: percentRecurrent ? percentRecurrent : 0,
        color: '#F7931B',
      },
      {
        name: 'Eventuais',
        amount: amountEventual,
        percent: percentEventual ? percentEventual : 0,
        color: '#E44C4E',
      },
    ];
  }, [monthSelected, yearSelected]);

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

        <BarChartBox
          title="Saídas"
          data={relationExpensevesRecurrentVersusEventual}
        />

        <BarChartBox
          title="Entradas"
          data={relationGainsRecurrentVersusEventual}
        />
      </Content>
    </Container>
  );
};

export default Dashboard;
