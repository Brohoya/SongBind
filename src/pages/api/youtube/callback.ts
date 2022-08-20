import { NextApiRequest, NextApiResponse } from "next";
const {google} = require('googleapis');
var Cookies = require('cookies');

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    // console.log('YOUTUBE CALLBACK');
    // console.log(req.query.code);

    const code = req.query.code || null;
    const state = req.query.state || null;
    console.log(code, state);

    var protocol = 'https';
    const host = req.headers.host;

    if(req.headers.host === 'localhost:3000') {
        protocol = 'http';
    }

    if(code !== null) {
        const redirect_uri = `${protocol}://${host}/api/youtube/callback`;

        const oauth2Client = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri
        );
    
        const {tokens} = await oauth2Client.getToken(code);

        var cookies = new Cookies(req, res);
        cookies.set('songbind_yt_auth', JSON.stringify({
            access_token: tokens.access_token, 
            refresh_token: tokens.refresh_token,
            expiration_date: tokens.expiry_date,
            user: {
                username: 'username',
                email: 'email',
                uid: 'uid',
                img: 'img'
            }
        }), {path: '/', httpOnly: true})

        console.log(cookies.get('songbind_yt_auth'));
    
        res.redirect('/platforms/');
    } else {
        res.redirect(`/platforms/#${new URLSearchParams({
            error: 'invalid_token'
        }).toString()}`);
    }

    
}
