import {LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area} from 'recharts';

export default function Linechart({title, axis, data, width, height}) {
    return (
        <div>
            <h3>{title}</h3>
            <ResponsiveContainer width={width} height={height}>
            <LineChart key={title} data={data} margin={{top: 20, right: 10, bottom: 5, left: 10}}>
                <Line type="monotone" dataKey={axis} stroke="#8884d8"/>
                <CartesianGrid stroke="#ccc"/>
                <XAxis dataKey="time"/>
                <YAxis/>
                <Tooltip/>
            </LineChart>
            </ResponsiveContainer>
        </div>
    )
}