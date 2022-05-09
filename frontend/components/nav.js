import Link from "next/link";
import navStyles from '../styles/nav.module.css'
import {useRouter} from 'next/router';



const Nav = () =>{
    const router = useRouter()
    return (
        <nav className={navStyles.nav}>
            <ul>
                <li>
                    <Link href={"/"}>
                        <a style={{borderBottom: "/" === router.pathname ? "solid" : "none"}}>메인화면</a>
                    </Link>
                </li>
                <li>
                    <Link href={"/electoronical_equipment"}>
                        <a style={{borderBottom: "/electoronical_equipment" === router.pathname ? "solid" : "none"}}>전기기기 전원</a>
                    </Link>
                </li>
                <li>
                    <Link href={"/power_consumption"}>
                        <a style={{borderBottom: "/power_consumption" === router.pathname ? "solid" : "none"}}>전력사용량 및 예측</a>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Nav