import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, PieChart, Pie, Legend, Cell } from 'recharts';
import { EventGenresChartProps, GenreChartData } from '../types';

const colors = ['#807ce4', '#9A96EA', '#B2B0EF', '#CCCBF4', '#E5E5FA'];

const EventGenresChart: React.FC<EventGenresChartProps> = ({ events }) => {
  const [data, setData] = useState<GenreChartData[]>([]);
  const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'];

  const getData = (): GenreChartData[] => {
    const data = genres.map(genre => {
      const filteredEvents = events.filter(event =>
        event.summary.includes(genre)
      );
      return { name: genre, value: filteredEvents.length };
    });
    return data;
  };

  useEffect(() => {
    setData(getData());
  }, [`${events}`]);

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    percent,
    index,
  }: {
    cx: number;
    cy: number;
    midAngle: number;
    outerRadius: number;
    percent: number;
    index: number;
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius;
    const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.07;
    const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.07;
    return percent ? (
      <text
        x={x}
        y={y}
        fill="#8884d8"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${genres[index]} ${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };

  const renderLegend = (props: {
    payload?: Array<{ color: string; value: string }>;
  }) => {
    const { payload } = props;

    return (
      <ul className="genres-pie-chart__legend">
        {payload?.map((entry, index) => (
          <li
            className="genres-pie-chart__legend-item"
            key={`item-${index}`}
            style={{ '--icon-color': entry.color } as React.CSSProperties}
          >
            {entry.value}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <ResponsiveContainer width="99%" height={400}>
      <PieChart className="genres-pie-chart">
        <Pie
          data={data}
          dataKey="value"
          fill="#8884d8"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={130}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={colors[index % colors.length]}
              stroke="#24232b"
              strokeWidth={4}
            />
          ))}
        </Pie>
        <Legend content={renderLegend} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EventGenresChart;
