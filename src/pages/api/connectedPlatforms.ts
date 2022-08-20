// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getCookie, hasCookie } from "cookies-next";
import Cookies from 'cookies';

type Platform = {
    name: string,
    connected: boolean,
    api: string,
    img: string,
    user: {[key: string]: string} | null
}

export type Platforms = {
    [key: string] : Platform
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Platforms>
) {
    var cookies = new Cookies(req, res);

    const spotify_connected = cookies.get('songbind_spotify_auth') !== undefined || cookies.get('songbind_spotify_auth') === '' ? true : false;
    const spotify_userInfo = spotify_connected ? JSON.parse(cookies.get('songbind_spotify_auth')).user : null;

    const yt_connected  = cookies.get('songbind_yt_auth') ? true : false;
    const yt_userInfo = yt_connected ? JSON.parse(cookies.get('songbind_yt_auth')).user : null;

    const appleMusic_connected  = cookies.get('songbind_appleMusic_auth') ? true : false;
    const appleMusic_userInfo = appleMusic_connected ? JSON.parse(cookies.get('songbind_appleMusic_auth')).user : null;

    const deezer_connected  = cookies.get('songbind_deezer_auth') ? true : false;
    const deezer_userInfo = deezer_connected ? JSON.parse(cookies.get('songbind_deezer_auth')).user : null;

    const soundCloud_connected  = cookies.get('songbind_soundCloud_auth') ? true : false;
    const soundCloud_userInfo = soundCloud_connected ? JSON.parse(cookies.get('songbind_soundCloud_auth')).user : null;


    res.status(200).json({
        spotify: {
            name: 'Spotify',
            connected: spotify_connected,
            img: 'spotify',
            api: 'spotify',
            user: spotify_userInfo
        },
        yt: {
            name: 'Youtube Music',
            connected: yt_connected ,
            img: 'youtube',
            api: 'youtube',
            user: yt_userInfo
        },
        appleMusic: {
            name: 'Apple Music',
            connected: appleMusic_connected ,
            img: 'appleMusic',
            api: 'appleMusic',
            user: appleMusic_userInfo
        },
        deezer: {
            name: 'Deezer',
            connected: deezer_connected ,
            img: 'deezer',
            api: 'deezer',
            user: deezer_userInfo
        },
        soundCloud: {
            name: 'SoundCloud',
            connected: soundCloud_connected ,
            img: 'soundCloud',
            api: 'soundCloud',
            user: soundCloud_userInfo
        },
    });
}
