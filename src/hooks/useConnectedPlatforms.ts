import { getCookie, hasCookie } from "cookies-next";

export default async function useConnectedPlatforms() {
    let data;
    try {
        data = await (await fetch('http://localhost:3000/api/connectedPlatforms', {method: 'GET'})).json();
    } catch (e) {
        data = e
    }

    return data;

    // const spotify = hasCookie('songbind_spotify_auth') ? JSON.parse(getCookie('songbind_spotify_auth').toString()) : null;
    // const yt = hasCookie('songbind_yt_auth') ? JSON.parse(getCookie('songbind_yt_auth').toString()) : null;
    // const appleMusic = hasCookie('songbind_appleMusic_auth') ? JSON.parse(getCookie('songbind_appleMusic_auth').toString()) : null;
    // const deezer = hasCookie('songbind_deezer_auth') ? JSON.parse(getCookie('songbind_deezer_auth').toString()) : null;
    // const soundCloud = hasCookie('songbind_soundCloud_auth') ? JSON.parse(getCookie('songbind_soundCloud_auth').toString()) : null;
}