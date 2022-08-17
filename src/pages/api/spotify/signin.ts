import { NextApiRequest, NextApiResponse } from "next";
import { scopes } from "../../../lib/spotify";

export default async function handler (req: NextApiRequest, res: NextApiResponse) {

    var protocol = 'https';
    const host = req.headers.host;

    if(req.headers.host === 'localhost:3000') {
        protocol = 'http';
    }

    if(req.headers.referer === `${protocol}://${req.headers.host}/platforms`) {
        const generateRandomString = (length) => {
            var text = '';
            var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
          
            for (var i = 0; i < length; i++) {
              text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        };
        
        const state = generateRandomString(16);
        const redirect_uri = `${protocol}://${host}/api/spotify/callback`;
    
        const queryParamString = new URLSearchParams({
            response_type: 'code',
            client_id: process.env.SPOTIFY_CLIENT_ID,
            redirect_uri: redirect_uri,
            scope: scopes,
            state: state,
        });
        const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`;
    
        res.redirect(LOGIN_URL);
    } else {
        res.redirect(`${protocol}://${req.headers.host}`)
    }
}
