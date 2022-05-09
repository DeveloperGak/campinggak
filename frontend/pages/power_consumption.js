import axios from "axios";
import Select from 'react-select'
import {useState} from "react";
import Table from "../components/table";
import Linechart from "../components/linechart";
import AreaChartFillByValue from "../components/areachart_fiil_by_value";

const PowerConsumption = ({posts}) => {
    const [table, setTable] = useState('');
    const [gra, setGra] = useState('');
    const [gra2, setGra2] = useState('');
    const [gra3, setGra3] = useState('');
    const selectChange = async ({value}) =>{
        try {
            const res = await axios.get(`http://127.0.0.1:8000/backend/power_generation?code=${value}`);
            let arData1 = ""
            let arData2 = ""
            if (res.status === 200) {
                const data = await res.data;
                arData1 = data
                setTable(<Table data={data}/>)
                setGra(<Linechart title={"누적충전량(Wh)"} axis={"누적충전량"} data={data} width={700} height={230}/>)
            }
            //get_power_consumption
            const res2 = await axios.get(`http://127.0.0.1:8000/backend/get_power_consumption`);
            if (res2.status === 200) {
                const data = await res2.data;
                arData2 = data
                setGra2(<Linechart title={"누적소비량(Wh)"} axis={"누적소비량"} data={data} width={700} height={230}/>)
            }
            if(res.status === 200 && res2.status === 200){
                setGra3(<AreaChartFillByValue title={"누적충전 - 누적소비(Wh)"} raw1={arData1} raw2={arData2} />)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const options = posts.map(
        post => ({ value: post.fields['code'], label: post.fields['location'] })
    )
    return (
        <div className={"content-wrap"}>
            <h1>전력사용량 및 예측</h1>
            <div style={{"display": "grid", "gridTemplateColumns": "700px 700px"}}>
                <div>
                    <Select id={"selectbox"} instanceId="selectbox" options={options} onChange={(value) => {selectChange(value)}} style={{"width":"500px"}}/>
                    <div>{table}</div>
                </div>
                <div>
                    {gra}
                    {gra2}
                    {gra3}
                </div>
            </div>
        </div>
    )
}


export const getServerSideProps = async () => {
    try {
        const res = await axios.get('http://127.0.0.1:8000/backend/get_location');
        if (res.status === 200) {
            const posts = await res.data;
            return {props: {posts}};
        }
        return {props: {}};
    } catch (error) {
        console.log(error);
        return {props: {}};
    }
}

export default PowerConsumption