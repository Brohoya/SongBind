import { NextApiRequest, NextApiResponse } from "next";
var Cookies = require('cookies');


export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    var protocol = 'https';
    const host = req.headers.host;

    if(req.headers.host === 'localhost:3000') {
        protocol = 'http';
    }

    // Verifies where the request is coming from
    if(req.headers.referer === `${protocol}://${host}/transfer`) {
        var cookies = new Cookies(req, res);

        if(cookies.get('songbind_spotify_auth') === undefined) res.redirect(`/transfer/#${new URLSearchParams({
            error: 'platform_disconnected'
        }).toString()}`);

        var userInfo = JSON.parse(cookies.get('songbind_spotify_auth'));

        // Refresh the token if expired
        // if(userInfo.expiration_date <= Date.now()) {
        if(true) {
            userInfo = await fetch(`${protocol}://${host}/api/spotify/refresh_token`, {
                method: 'POST',
                body: JSON.stringify(userInfo)
            }).then(res => res.json());
            cookies.set('songbind_spotify_auth', JSON.stringify(userInfo), {path: '/', httpOnly: true})
        }

        res.status(200).json(userInfo);
    } else {
        res.redirect(`/#${new URLSearchParams({
            error: 'forbidden_request_origin'
        }).toString()}`);
    }
}