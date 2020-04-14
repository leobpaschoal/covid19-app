import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area, Legend, ResponsiveContainer } from 'recharts';

const GraphicNew = ({ gNew, t }) => (
  <ResponsiveContainer height={350}>
    <AreaChart data={gNew} margin={{ top: 10, right: 10, left: 5, bottom: 0 }}>
      <defs>
        <linearGradient id='colorConfirmed' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='5%' stopColor='#3b79b7' stopOpacity={0.8} />
          <stop offset='95%' stopColor='#3b79b7' stopOpacity={0} />
        </linearGradient>
        <linearGradient id='colorDeaths' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='5%' stopColor='#ad2836' stopOpacity={0.8} />
          <stop offset='95%' stopColor='#ad2836' stopOpacity={0} />
        </linearGradient>
        <linearGradient id='colorCritical' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='5%' stopColor='#ca9b34' stopOpacity={0.8} />
          <stop offset='95%' stopColor='#ca9b34' stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis dataKey='name' />
      <YAxis label={{ value: t('peoples'), angle: -90, position: 'insideLeft' }} />
      <CartesianGrid strokeDasharray='3 3' />
      <Tooltip />
      <Legend iconType='square' />
      <Area
        type='monotone'
        dataKey='Confirmed'
        name={t('confirmed')}
        stroke='#3b79b7'
        fillOpacity={1}
        fill='url(#colorConfirmed)'
        style={{ border: '6px solid black' }}
      />
      <Area
        type='monotone'
        dataKey='Deaths'
        name={t('deaths')}
        stroke='#ad2836'
        fillOpacity={1}
        fill='url(#colorDeaths)'
      />
      <Area
        type='monotone'
        dataKey='Critical'
        name={t('critical')}
        stroke='#ca9b34'
        fillOpacity={1}
        fill='url(#colorCritical)'
      />
    </AreaChart>
  </ResponsiveContainer>
);

export default GraphicNew;
