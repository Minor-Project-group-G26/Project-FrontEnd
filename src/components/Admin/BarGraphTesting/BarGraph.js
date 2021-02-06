import React, { PureComponent, useEffect } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';
// import './BarGraph.css';

const data = [
  {
    name: '20-11-2020', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: '21-11-2020', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: '22-11-2020', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: '23-11-2020', uv: 2780, pv: 3908, amt: 2000,
  }
];



function BarGraph() {

  

  return (
    <div className="layout">
    <div className="sty">
       <AreaChart
        width={500}
        height={400}
        data={data}
        padding={{
          top: 50, right:0, left:250, bottom:0,
        }}
        margin={{
          top: 10, right: 30, left: 0, bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="uv" stackId="1" stroke="#8884d8" fill="#8884d8" />
        <Area type="monotone" dataKey="pv" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
        <Area type="monotone" dataKey="amt" stackId="1" stroke="#ffc658" fill="#ffc658" />
      </AreaChart>
    </div>
    </div>
  )
}

export default BarGraph

