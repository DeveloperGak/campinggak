import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';


export default function Radarchart({title, data, axis, value, width, height, color}) {
    return (
        <div>
            <h3 style={{"top": "20px"}}>{title}</h3>
            <ResponsiveContainer width={width} height={height}>
                <RadarChart key={title} cx="50%" cy="50%" outerRadius="80%" data={data}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey={axis} />
                    <PolarRadiusAxis />
                    <Radar name="Mike" dataKey={value} stroke="#8884d8" fill={color} fillOpacity={0.6} />
                </RadarChart>
            </ResponsiveContainer >
        </div>
    )
}