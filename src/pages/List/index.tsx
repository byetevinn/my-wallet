import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import HistoryFinanceCard from '../../components/HistoryFinanceCard';
import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';

import formatCurrency from '../../utils/formatCurrency';
import formatDate from '../../utils/formatDate';

import gains from '../../respositories/gains';
import expenses from '../../respositories/expenses';

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
  const [monthSelected, setMonthSelected] = useState(
    String(new Date().getMonth() + 1)
  );
  const [yearSelected, setYearSelected] = useState(
    String(new Date().getFullYear())
  );

  const { type } = useParams();

  const { title, lineColor, list } = useMemo(() => {
    return type === 'entry-balance'
      ? { title: 'Entradas', lineColor: '#F7931B', list: gains }
      : { title: 'Saídas', lineColor: '#E44C4E', list: expenses };
  }, [type]);

  const months = [
    {
      value: 9,
      label: 'Setembro',
    },
    {
      value: 8,
      label: 'Agosto',
    },
    {
      value: 7,
      label: 'Julho',
    },
    {
      value: 11,
      label: 'Novembro',
    },
  ];

  const years = [
    {
      value: 2022,
      label: 2022,
    },
    {
      value: 2021,
      label: 2021,
    },
    {
      value: 2020,
      label: 2020,
    },
    {
      value: 2019,
      label: 2019,
    },
    {
      value: 2018,
      label: 2018,
    },
    {
      value: 2023,
      label: 2023,
    },
  ];

  useEffect(() => {
    const filteredDate = list.filter(({ date }) => {
      const newDate = new Date(date);
      const month = String(newDate.getMonth() + 1);
      const year = String(newDate.getFullYear());

      return month === monthSelected && year === yearSelected;
    });

    // console.log(filteredDate);

    const formattedData = filteredDate.map(
      ({ description, amount, frequency, date }) => {
        return {
          id: String(Math.random() * new Date().getTime()),
          description: description,
          amountFormatted: formatCurrency(Number(amount)),
          dateFormatted: formatDate(date),
          frequency: frequency,
          tagColor: frequency === 'recorrente' ? '#4E41F0' : '#E44C4E',
        };
      }
    );

    setData(formattedData);
  }, [monthSelected, yearSelected]);

  return (
    <Container>
      <ContentHeader title={title} linecolor={lineColor}>
        <SelectInput
          options={months}
          onChange={(e) => setMonthSelected(e.target.value)}
          defaultValue={monthSelected}
        ></SelectInput>
        <SelectInput
          options={years}
          onChange={(e) => setYearSelected(e.target.value)}
          defaultValue={yearSelected}
        ></SelectInput>
      </ContentHeader>

      <Filters>
        <button type="button" className="tag-filter tag-filter-recurrent">
          Recorrentes
        </button>

        <button type="button" className="tag-filter tag-filter-eventual">
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
