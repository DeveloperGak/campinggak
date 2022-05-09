import axios from "axios";
import Barchart from "../components/barchart";
import Piechart from "../components/piechart";
import Radarchart from "../components/radarchart";
import Linechart from "../components/linechart";

const Index = ({icsrHigh, rnHigh, powerHigh, powerConsumption}) => {
    const date = new Date();
    const today = `${date.getFullYear()}-${date.getMonth() +1 }-${date.getDate() -1 }일 정보`

    const icsrData = icsrHigh.map(
        high => ({ "장소": high.fields['stnnm'], "일사량(MJ)": high.fields['icsr']})
    )

    const rnData = rnHigh.map(
        high => ({ "장소": high.fields['stnnm'], "강수량(mm)": high.fields['rn']})
    )

    const powerData = powerHigh.map(
        high => ({ "name": high['name'], "소비전력(Wh)": high['used_power']})
    )


    return (
        <div className={"content-wrap"}>
            <h1>{today}</h1>
            <div style={{"display":"grid", "gridTemplateColumns": "800px 800px"}}>
                <Barchart title={"일사량 높은 지역 Top3"} data={icsrData} axis={"장소"} value={"일사량(MJ)"} width={700} height={350} color={"#e58664"}/>
                <Linechart title={"시간당 소비전력(Wh)"} axis={"at_time"} data={powerConsumption} width={700} height={350}/>
                <Radarchart title={"전력 소비비율(Wh)"} data={powerData} axis={"name"} value={"소비전력(Wh)"} width={700} height={350} color={"#dec062"}/>
                <Barchart title={"강수량 높은 지역 Top3"} data={rnData} axis={"장소"} value={"강수량(mm)"} width={700} height={350} color={"#5f93e5"}/>
            </div>
        </div>
    )
}


export const getServerSideProps = async () => {
    try {
        const icsr = await axios.get('http://127.0.0.1:8000/backend/get_icsr_high');
        const rn = await axios.get('http://127.0.0.1:8000/backend/get_rn_high');
        const power = await axios.get('http://127.0.0.1:8000/backend/get_power_high');
        const consumption = await axios.get('http://127.0.0.1:8000/backend/get_power_consumption');

        if (rn.status === 200 && rn.status === 200 && power.status === 200 && consumption.status === 200) {
            const rnHigh = await rn.data;
            const icsrHigh = await icsr.data;
            const powerHigh = await power.data;
            const powerConsumption = await consumption.data;
            return {props: {icsrHigh, rnHigh, powerHigh, powerConsumption}};
        }
    } catch (error) {
        console.log(error);
        return {props: {}};
    }
}

export default Index