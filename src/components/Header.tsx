import Head from "next/head";
import useActivePage from "../hooks/useActivePage";

export default function Header() {
    const activePage = useActivePage();

    return (
        <Head>
            <title>{activePage}</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
    )
}
