import styles from '../styles/electoronical_equipment.module.css'
import axios from "axios";
import Equipment from "../components/equipment";

export default function Electoronical_equipment({equip}) {
    const equipments = equip.map(
        row => ({
            id: row['pk']
            , name: row.fields['name']
            , watt: row.fields['watt']
            , fileName: row.fields['file_name']
            , startDate: row.fields['start_date']
            , endDate: row.fields['end_date']
            , powerFlag: row.fields['power_flag']
        })
    )

    return (
        <div className={"content-wrap"}>
            <h1>전기기기 전원</h1>
            <div className={styles.wrap}>
                {equipments.map((row)=>(
                    <Equipment key={row.name} id={row.id} name={row.name} watt={row.watt} fileName={row.fileName} startDate={row.startDate} endDate={row.endDate} powerFlag={row.powerFlag}/>
                ))}
            </div>
        </div>
    )
}

export const getServerSideProps = async () => {
    try {
        const res = await axios.get('http://127.0.0.1:8000/backend/get_equipment');
        if (res.status === 200) {
            const equip = await res.data;
            return {props: {equip}};
        }
        return {props: {}};
    } catch (error) {
        console.log(error);
        return {props: {}};
    }
}