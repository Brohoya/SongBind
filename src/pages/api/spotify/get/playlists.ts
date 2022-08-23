import { NextApiRequest, NextApiResponse } from "next";
var Cookies = require('cookies');


export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    var protocol = 'https';
    const host = req.headers.host;

    if(req.headers.host === 'localhost:3000') {
        protocol = 'http';
    }

    if(req.headers.referer === `${protocol}://${host}/transfer`) {
        var cookies = new Cookies(req, res);

        if(cookies.get('songbind_spotify_auth') === undefined) res.redirect(`/transfer/#${new URLSearchParams({
            error: 'platform_disconnected'
        }).toString()}`);

        var userInfo = JSON.parse(cookies.get('songbind_spotify_auth'));

        if(userInfo.expiration_date <= Date.now()) {
            userInfo = await fetch(`${protocol}://${host}/api/spotify/refresh_token`, {
                method: 'POST',
                body: JSON.stringify(userInfo)
            }).then(res => res.json());
            cookies.set('songbind_spotify_auth', JSON.stringify(userInfo), {path: '/', httpOnly: true})
        }

        const getData = async (url) => await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${userInfo.access_token}`,
                'Content-type': 'application/json'
            },
        }).then(res => res.json());

        const PLAYLISTS_ENDPOINT = `https://api.spotify.com/v1/me/playlists?offset=0&limit=1`;
        const playlist = await getData(PLAYLISTS_ENDPOINT);

        const playlistTotal = playlist.total;
        const quotient = Math.floor(playlistTotal/50);
        const remainder = playlistTotal % 50;
        let playlists = [];
        let data;

        if(quotient > 0) {
            var offset = "offset=0";
            for(let i = 0; i < quotient; i++) {
                data = await getData(`https://api.spotify.com/v1/me/playlists?${offset}&limit=50`);
                playlists = playlists.concat(data.items)
                offset = `offset=${(i+1) * 50}`;
            };
            data = await getData(`https://api.spotify.com/v1/me/playlists?${offset}&limit=${remainder}`);
            playlists = playlists.concat(data.items)
        } else {
            data = await getData(`https://api.spotify.com/v1/me/playlists?offset=0&limit=${remainder}`);
            playlists = playlists.concat(data.items)
        };

        res.status(200).json(playlists);
    } else {
        res.redirect(`/#${new URLSearchParams({
            error: 'playlists_not_fetched'
        }).toString()}`);
    }
}