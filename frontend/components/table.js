import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import Styles from '../styles/table.module.css'

const Table = ({data}) =>{
    const columns = ["시간", "일사량(W/㎡)", "기온(℃)", "풍속(㎧)", "발전량(W)"]

    return (
        <table className={Styles.table}>
            <thead className={Styles.thead}>
            <tr className={Styles.tr}>
                {columns.map((column) => (
                    <th className={Styles.th} key={column}>{column}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {data.map((row) => (
                <tr key={row.time} className={Styles.tr}>
                    <td className={Styles.td}>{row.time}</td>
                    <td>{row.icsr}</td>
                    <td>{row.ta}</td>
                    <td>{row.ws}</td>
                    <td>{row.generate}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default Table