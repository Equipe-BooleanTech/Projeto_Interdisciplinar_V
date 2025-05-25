import React from 'react';
import { BarChart, PieChart, RadarChart, LineChart } from 'react-native-gifted-charts';
import { ChartProps } from './Chart.interface';
import { ChartContainer } from './Chart.styles';

const Chart = (props: ChartProps) => {
  const { type, data, ...rest } = props;

  switch (type) {
    case 'bar':
      // Type assertion for BarChart props
      return (
        <ChartContainer>
          <BarChart data={data} {...(rest as Omit<typeof rest, 'type'>)} />
        </ChartContainer>
      );
    case 'pie':
      // Type assertion for PieChart props
      return (
        <ChartContainer>
          <PieChart data={data} {...(rest as Omit<typeof rest, 'type'>)} />
        </ChartContainer>
      );
    case 'radar':
      // Type assertion for RadarChart props
      return (
        <ChartContainer>
          <RadarChart data={data} {...(rest as Omit<typeof rest, 'type'>)} />
        </ChartContainer>
      );
    case 'line':
      // Type assertion for LineChart props
      return (
        <ChartContainer>
          <LineChart data={data} {...(rest as Omit<typeof rest, 'type'>)} />
        </ChartContainer>
      );
    default:
      return null;
  }
};

export default Chart;
