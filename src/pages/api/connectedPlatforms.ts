// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getCookie, hasCookie } from "cookies-next";
import Cookies from 'cookies'

type Data = {
    spotify: boolean,
    yt: boolean,
    appleMusic: boolean,
    deezer: boolean,
    soundCloud: boolean
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse//<Data>
) {
    var cookies = new Cookies(req, res);
    // console.log(cookies);

    const spotify = cookies.get('songbind_spotify_auth') !== undefined || cookies.get('songbind_spotify_auth') === '' ? true : false;
    const yt = cookies.get('songbind_yt_auth') ? true : false;
    const appleMusic = cookies.get('songbind_appleMusic_auth') ? true : false;
    const deezer = cookies.get('songbind_deezer_auth') ? true : false;
    const soundCloud = cookies.get('songbind_soundCloud_auth') ? true : false;

    // console.log(cookies.get('songbind_spotify_auth'));

    res.status(200).json({
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
    });
}
