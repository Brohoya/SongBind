import { scopes } from "../../../../lib/spotify";

export default async function handler(req, res) {

    const generateRandomString = (length) => {
        var text = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      
        for (var i = 0; i < length; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };
    
    const state = generateRandomString(16);
    const redirect_uri = 'http://localhost:3000/api/auth/callback/spotify'

    const queryParamString = new URLSearchParams({
        response_type: 'code',
        client_id: process.env.SPOTIFY_CLIENT_ID,
        redirect_uri: redirect_uri,
        scope: scopes,
        state: state,
    });
    const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`;

    res.redirect(LOGIN_URL);
}
