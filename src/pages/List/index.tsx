import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import HistoryFinanceCard from '../../components/HistoryFinanceCard';
import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';

import formatCurrency from '../../utils/formatCurrency';
import formatDate from '../../utils/formatDate';

import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';
import lisOfMonths from '../../utils/months';

import { Container, Content, Filters } from './styles';

interface IData {
  id: string;
  description: string;
  amountFormatted: string;
  frequency: string;
  dateFormatted: string;
  tagColor: string;
}

const List = () => {
  const [data, setData] = useState<IData[]>([]);
  const [monthSelected, setMonthSelected] = useState<number>(
    new Date().getMonth() + 1
  );
  const [yearSelected, setYearSelected] = useState<number>();
  const [frequencyFilterSelected, setFrequencyFilterSelected] = useState([
    'recorrente',
    'eventual',
  ]);

  const { type: movimentType } = useParams();

  const { title, lineColor, list } = useMemo(() => {
    return movimentType === 'entry-balance'
      ? { title: 'Entradas', lineColor: '#4E41F0', list: gains }
      : { title: 'Saídas', lineColor: '#E44C4E', list: expenses };
  }, [movimentType]);

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

    list.forEach(({ date }) => {
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

  const handleFrequencyClick = (frequency: string) => {
    const alreadySelected = frequencyFilterSelected.findIndex(
      (item) => item === frequency
    );

    if (alreadySelected >= 0) {
      const filtered = frequencyFilterSelected.filter(
        (item) => item !== frequency
      );

      setFrequencyFilterSelected(filtered);
    } else {
      setFrequencyFilterSelected((prev) => [...prev, frequency]);
    }
  };

  useEffect(() => {
    const filteredDate = list.filter(({ date, frequency }) => {
      const newDate = new Date(date);
      const month = newDate.getMonth() + 1;
      const year = newDate.getFullYear();

      return (
        month === monthSelected &&
        year === yearSelected &&
        frequencyFilterSelected.includes(frequency)
      );
    });

    const formattedData = filteredDate.map(
      ({ description, amount, frequency, date }) => {
        return {
          id: uuidv4(),
          description: description,
          amountFormatted: formatCurrency(Number(amount)),
          dateFormatted: formatDate(date),
          frequency: frequency,
          tagColor: frequency === 'recorrente' ? '#4E41F0' : '#E44C4E',
        };
      }
    );

    setData(formattedData);
  }, [monthSelected, yearSelected, list, frequencyFilterSelected]);

  return (
    <Container>
      <ContentHeader title={title} linecolor={lineColor}>
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

      <Filters>
        <button
          type="button"
          className={`tag-filter tag-filter-recurrent ${
            frequencyFilterSelected.includes('recorrente') && 'tag-actived'
          }`}
          onClick={() => handleFrequencyClick('recorrente')}
        >
          Recorrentes
        </button>

        <button
          type="button"
          className={`tag-filter tag-filter-eventual ${
            frequencyFilterSelected.includes('eventual') && 'tag-actived'
          }`}
          onClick={() => handleFrequencyClick('eventual')}
        >
          Eventuais
        </button>
      </Filters>

      <Content>
        {data.map(
          ({ id, amountFormatted, dateFormatted, description, tagColor }) => {
            return (
              <HistoryFinanceCard
                key={id}
                tagColor={tagColor}
                title={description}
                subtitle={dateFormatted}
                amount={amountFormatted}
              />
            );
          }
        )}
      </Content>
    </Container>
  );
};

export default List;
