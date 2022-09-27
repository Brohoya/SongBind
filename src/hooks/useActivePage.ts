import { useRouter } from 'next/router';

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
        default: activePage = "Songbind"; break;
    }

    return activePage;
}
