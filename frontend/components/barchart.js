import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export default function Barchart({title, data, axis, value, width, height, color}) {
    return (
        <div>
            <h3 style={{"top": "20px"}}>{title}</h3>
            <ResponsiveContainer width={width} height={height}>
            <BarChart
                data={data}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={axis} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey={value} fill={color} />
            </BarChart>
            </ResponsiveContainer >
        </div>
    )
}