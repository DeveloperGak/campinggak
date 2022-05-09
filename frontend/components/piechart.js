import { PieChart, Pie, Tooltip } from "recharts";


export default function Piechart({title, data, axis, value, width, height, color}) {
    return (
        <div>
            <h3 style={{"top": "20px"}}>{title}</h3>
            <PieChart width={width} height={height}>
                <Pie
                    dataKey={value}
                    isAnimationActive={true}
                    data={data}
                    cx={350}
                    cy={170}
                    outerRadius={150}
                    fill="#8884d8"
                    label
                />
                <Tooltip />
            </PieChart>
        </div>
    )
}