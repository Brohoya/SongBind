var request = require('request');
var Cookies = require('cookies');

export default function handler(req, res) {
    // requesting access token from refresh token
    var refresh_token = req.query.refresh_token;
    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: { 'Authorization': 'Basic ' + (new Buffer(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')) },
        form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        },
        json: true
    };

    request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            const cookies = new Cookies(req, res);

            cookies.set('songbind_spotify_auth', JSON.stringify({
                access_token: body.access_token, 
                refresh_token: body.refresh_token
            }), {path: '/', httpOnly: true})

            res.redirect('/dashboard');
        }
    });
}