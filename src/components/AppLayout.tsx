import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useRouter } from "next/router";
import { PlatformsProvider } from "../hooks/usePlatforms";

type AppLayout = {
    children?: JSX.Element
}

export default function AppLayout({ children }: AppLayout): JSX.Element {
    const router = useRouter();
    
    const RoutesWithoutAppLayout = 
    router.pathname === '/' 
    || router.pathname.startsWith('/login')
    || router.pathname.startsWith('/profile');

    if(RoutesWithoutAppLayout) {
        return children
    } else {
        return (
            <PlatformsProvider>
                <main>
                    <Navbar />
                    <Sidebar/>
                    <> { children } </>
                </main>
            </PlatformsProvider>
        )
    }
}