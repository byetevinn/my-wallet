import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip } from 'recharts';

import formatCurrency from '../../utils/formatCurrency';

import {
  Container,
  Legend,
  LegendContainer,
  SideLeft,
  SideRight,
} from './styles';

interface IBarChartBox {
  title: string;
  data: {
    name: string;
    amount: number;
    percent: number;
    color: string;
  }[];
}

const BarChartBox = ({ title, data }: IBarChartBox) => {
  return (
    <Container>
      <SideLeft>
        <h2> {title} </h2>

        <LegendContainer>
          {data.map(({ name, percent, color }) => {
            return (
              <Legend color={color} key={name}>
                <div> {percent}% </div>
                <span> {name} </span>
              </Legend>
            );
          })}
        </LegendContainer>
      </SideLeft>
      <SideRight>
        <ResponsiveContainer>
          <BarChart data={data}>
            <Bar dataKey="amount" name="Valor">
              {data.map(({ name, color }) => (
                <Cell key={name} cursor="pointer" fill={color} />
              ))}
            </Bar>
            <Tooltip
              formatter={(value) => formatCurrency(Number(value))}
              cursor={{ fill: 'none' }}
            />
          </BarChart>
        </ResponsiveContainer>
      </SideRight>
    </Container>
  );
};
export default BarChartBox;
