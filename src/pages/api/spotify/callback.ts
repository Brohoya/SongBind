var request = require('request');
var Cookies = require('cookies');


export default async function handler(req, res) {

    const code = req.query.code || null;
    const state = req.query.state || null;

    var protocol = 'https';
    const host = req.headers.host;

    if(req.headers.host === 'localhost:3000') {
        protocol = 'http';
    }

    const redirect_uri = `${protocol}://${host}/api/spotify/callback`;

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
                    refresh_token = body.refresh_token,
                    expiration_date = Date.now() + body.expires_in * 1000;
        
                var options = {
                    url: 'https://api.spotify.com/v1/me',
                    headers: { 'Authorization': 'Bearer ' + access_token },
                    json: true
                };
        
                // use the access token to access the Spotify Web API
                request.get(options, function(error, response, body) {
                    if (!error && response.statusCode === 200) {
                        var username = body.display_name,
                            email = body.email,
                            uid = body.id,
                            img = body.images[0].url;

                        const cookies = new Cookies(req, res);

                        cookies.set('songbind_spotify_auth', JSON.stringify({
                            access_token: access_token, 
                            refresh_token: refresh_token,
                            expiration_date: expiration_date,
                            user: {
                                username: username,
                                email: email,
                                uid: uid,
                                img: img
                            }
                        }), {path: '/', httpOnly: true})

                        res.redirect('/platforms/');
                    } else {
                        res.redirect(`/platforms/#${new URLSearchParams({
                            error: 'cookie not created properly'
                        }).toString()}`);
                    }
                });
            } else {
                res.redirect(`/platforms/#${new URLSearchParams({
                    error: 'invalid_token'
                }).toString()}`);
            }
        });
    }
}

// res.redirect(`/platforms/#${new URLSearchParams({
                //     access_token: access_token,
                //     refresh_token: refresh_token
                // }).toString()}`)