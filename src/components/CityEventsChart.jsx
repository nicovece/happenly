import React from 'react';
import { useState, useEffect } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ZAxis,
} from 'recharts';
import './Charts.scss';

const CityEventsChart = ({ allLocations, events }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(getData());
  }, [`${events}`]);

  const getData = () => {
    const data = allLocations.map(location => {
      const count = events.filter(event => event.location === location).length;
      const city = location.split(/, | - /)[0];
      return { city, count };
    });
    return data;
  };
  return (
    <ResponsiveContainer width="99%" height={400}>
      <ScatterChart
        margin={{
          top: 20,
          right: 20,
          bottom: 60,
          left: -30,
        }}
      >
        <CartesianGrid
          // fill="#33325b"
          // fillOpacity={0.3}
          strokeDasharray="4 4"
          opacity={0.5}
        />
        <XAxis
          type="category"
          dataKey="city"
          name="City"
          angle={60}
          interval={0}
          tick={{ dx: 20, dy: 40, fontSize: 14 }}
        />
        <YAxis type="number" dataKey="count" name="Number of events" />
        <ZAxis range={[80, 81]} />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name="A school" data={data} fill="#807ce4" shape="circle" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default CityEventsChart;
