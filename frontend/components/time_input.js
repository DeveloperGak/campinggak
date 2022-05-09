import React, {useState} from 'react';
import axios from "axios";

const TimeInput = ({id, target, value}) => {
    const [inputValue, setInputValue] = useState(value);
    const setTime = async (time) =>{
        try {
            const res = await axios.get('http://127.0.0.1:8000/backend/set_time',
                {params: {
                        id: id,
                        target: target,
                        time: time
                    }});
            if (res.status === 200) {
                const data = await res.data;
            }
        } catch (error) {
            console.log(error);
        }
    }
    const valueValidate = (e) =>{
        const regex = /^[0-9]{0,2}$/;
        if (regex.test(e.target.value)) {
            setInputValue(e.target.value);
        }
        if(e.target.value > 23){
            setInputValue(23);
        }
        if(e.target.value < -1){
            setInputValue(0);
        }
        setTime(e.target.value)
    }
    return (
        <>
            <input type='number' min='0' max='24' onChange={(e)=>{
                valueValidate(e)
            }} value={inputValue} style={{"width": "40px"}}/>
        </>
    );
};

export default TimeInput;