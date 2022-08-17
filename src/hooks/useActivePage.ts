import { useRouter } from 'next/router';
// import { createContext } from 'react';

// interface IActivePageContext {
//     activePage: string | null,
//     setActivePage: Function | null,
// }

// export const ActivePageContext = createContext<IActivePageContext>({activePage: null, setActivePage: null});

export default function useActivePage() {
    const router = useRouter();
    const page = router.pathname?.split('/')[1];
    let activePage;

    switch(page) {
        case 'dashboard': activePage = "Dashboard"; break;
        case 'library': activePage = "Library"; break;
        case 'playlistCreator': activePage = "Playlist creator"; break;
        case 'transfer': activePage = "Transfer"; break;
        case 'explore': activePage = "Explore"; break;
        case 'platforms': activePage = "Platforms"; break;
        default: activePage = "Not found"; break;
    }

    return activePage;
}
