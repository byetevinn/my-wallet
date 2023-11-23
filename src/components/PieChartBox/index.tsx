import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

import {
  Container,
  SideLeft,
  SideRight,
  LegendContainer,
  Legend,
} from './styles';

interface IPieChart {
  data: {
    name: string;
    value: number;
    percent: number;
    color: string;
  }[];
}

const PieChartBox = ({ data }: IPieChart) => (
  <Container>
    <SideLeft>
      <h2>Relação</h2>
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
        <PieChart>
          <Pie data={data} labelLine={false} dataKey="percent">
            {data.map(({ color, name }) => (
              <Cell key={name} fill={color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </SideRight>
  </Container>
);

export default PieChartBox;
