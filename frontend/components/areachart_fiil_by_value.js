import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AreaChartFillByValue = ({title, raw1, raw2}) =>{
    let data = []
    raw1.forEach((v, i)=>{
        let value = parseFloat(v['누적충전량']) - parseFloat(raw2[i]['누적소비량']);
        data.push({"time": v['time'], "value" : value})
    })

    const gradientOffset = () => {
        const dataMax = Math.max(...data.map((i) => i.value));
        const dataMin = Math.min(...data.map((i) => i.value));

        if (dataMax <= 0) {
            return 0;
        }
        if (dataMin >= 0) {
            return 1;
        }

        return dataMax / (dataMax - dataMin);
    };

    const off = gradientOffset();
    return (
        <div className={"content-wrap"}>
            <h3 style={{"top": "20px"}}>{title}</h3>
            <ResponsiveContainer width={700} height={200}>
            <AreaChart
                data={data}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <defs>
                    <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                        <stop offset={off} stopColor="green" stopOpacity={1} />
                        <stop offset={off} stopColor="red" stopOpacity={1} />
                    </linearGradient>
                </defs>
                <Area type="monotone" dataKey="value" stroke="#000" fill="url(#splitColor)" />
            </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}



export default AreaChartFillByValue