import equipmentStyles from '../styles/equipment.module.css'
import React, {useState} from "react";
import TimeInput from "./time_input";
import axios from "axios";
import Table from "./table";
import Linechart from "./linechart";

const Equipment = ({id, name, watt, fileName, startDate, endDate, powerFlag}) =>{
    let [checkedValue, setCheckedValue] = useState(powerFlag !== "0")

    const setPowerFlag = async (e) =>{
        setCheckedValue(!checkedValue)

        try {
            const res = await axios.get('http://127.0.0.1:8000/backend/set_powerflag',
                {params: {
                        id: id,
                        power_flag: e.target.checked === true? "1":"0"
                }});
            if (res.status === 200) {
                const data = await res.data;
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
            <div className={equipmentStyles.card}>
                <img className={equipmentStyles.image} src={`img/${fileName}`} alt="temp" />
                <div className={equipmentStyles.container}>
                    <h4><b>{name} ({watt}W)</b></h4>
                    <div style={{"display":"gird", "gridTemplateColumns": "130 130px"}}>
                        <div><input type="checkbox" id={id} name={id} onChange={setPowerFlag} checked={checkedValue}/>전원</div>
                        <div>사용시간 : <TimeInput id={id} target={"start_date"} value={startDate}/>시 ~ <TimeInput id={id} target={"end_date"} value={endDate}/>시</div>
                    </div>
                </div>
            </div>
    )
}

Equipment.defaultProps={
    name: '이름'
    , watt: '0'
    , fileName: 'noimg.png'
}

export default Equipment