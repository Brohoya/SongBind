// import { getCookie, hasCookie } from "cookies-next";
import Cookies from 'cookies';
import { useContext, useState, createContext } from 'react';

const platformContext = createContext(null);

export default function usePlatforms() {
    return useContext(platformContext);
}

export function PlatformsProvider(props) {
    const [platforms, setPlatforms] = useState(null);

    // const getPlatforms = async () => {
    //     const data = await (await fetch('/api/connectedPlatforms', {method: 'GET'})).json();
    //     setPlatforms(data);
    // };

    // console.log(props);
    
    const getPlatforms = () => {
        return platforms;
    };

    const value={getPlatforms, setPlatforms};

    return <platformContext.Provider value={value} {...props} />;
}

export function ConnectedPlatforms(req, res) {
    var cookies = new Cookies(req, res);

    const spotify = cookies.get('songbind_spotify_auth') !== undefined  ? true : false;
    const yt = cookies.get('songbind_yt_auth') ? true : false;
    const appleMusic = cookies.get('songbind_appleMusic_auth') ? true : false;
    const deezer = cookies.get('songbind_deezer_auth') ? true : false;
    const soundCloud = cookies.get('songbind_soundCloud_auth') ? true : false;

    const platforms = {
        spotify: {
            name: 'Spotify',
            connected: spotify,
            img: 'spotify',
            api: 'spotify'
        },
        yt: {
            name: 'Youtube Music',
            connected: yt,
            img: 'youtube',
            api: 'youtube'
        },
        appleMusic: {
            name: 'Apple Music',
            connected: appleMusic,
            img: 'appleMusic',
            api: 'appleMusic'
        },
        deezer: {
            name: 'Deezer',
            connected: deezer,
            img: 'deezer',
            api: 'deezer'
        },
        soundCloud: {
            name: 'SoundCloud',
            connected: soundCloud,
            img: 'soundCloud',
            api: 'soundCloud'
        },
    }

    return platforms;

    // const spotify = hasCookie('songbind_spotify_auth') ? JSON.parse(getCookie('songbind_spotify_auth').toString()) : null;
    // const yt = hasCookie('songbind_yt_auth') ? JSON.parse(getCookie('songbind_yt_auth').toString()) : null;
    // const appleMusic = hasCookie('songbind_appleMusic_auth') ? JSON.parse(getCookie('songbind_appleMusic_auth').toString()) : null;
    // const deezer = hasCookie('songbind_deezer_auth') ? JSON.parse(getCookie('songbind_deezer_auth').toString()) : null;
    // const soundCloud = hasCookie('songbind_soundCloud_auth') ? JSON.parse(getCookie('songbind_soundCloud_auth').toString()) : null;
}