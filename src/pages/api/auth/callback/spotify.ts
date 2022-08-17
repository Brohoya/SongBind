var request = require('request');
var Cookies = require('cookies');


export default async function handler(req, res) {

    const code = req.query.code || null;
    const state = req.query.state || null;

    const redirect_uri = 'http://localhost:3000/api/auth/callback/spotify';

    if (state === null) {
        res.redirect('/platforms/#' + new URLSearchParams({ error: 'state_mismatch' }));
    } else {
        var authOptions = {
          url: 'https://accounts.spotify.com/api/token',
          form: {
            code: code,
            redirect_uri: redirect_uri,
            grant_type: 'authorization_code'
          },
          headers: {
            'Authorization': 'Basic ' + (new Buffer(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'))
          },
          json: true
        };
        request.post(authOptions, function(error, response, body) {
            if (!error && response.statusCode === 200) {
        
                var access_token = body.access_token,
                    refresh_token = body.refresh_token;
        
                var options = {
                    url: 'https://api.spotify.com/v1/me',
                    headers: { 'Authorization': 'Bearer ' + access_token },
                    json: true
                };
        
                // use the access token to access the Spotify Web API
                // request.get(options, function(error, response, body) {
                //     console.log(body);
                // });

                const cookies = new Cookies(req, res);

                cookies.set('songbind_spotify_auth', JSON.stringify({access_token: access_token, refresh_token: refresh_token}))
        
                // we can also pass the token to the browser to make requests from there
                // res.redirect(`/platforms/#${new URLSearchParams({
                //     access_token: access_token,
                //     refresh_token: refresh_token
                // }).toString()}`)

                res.redirect(`/platforms/`);
            } else {
                res.redirect(`/platforms/#${new URLSearchParams({
                    error: 'invalid_token'
                }).toString()}`);
            }
        });
    }
}