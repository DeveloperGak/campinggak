import Head from 'next/head'
import Nav from './nav'
const Layout = ({children}) =>{
    return(
        <>
            <Head>
                <title>캠핑각</title>
            </Head>
            <div className={"wrap"}>
                <Nav />
                <div className={"content"}>
                    {children}
                </div>
            </div>
        </>
    )
}

export default Layout