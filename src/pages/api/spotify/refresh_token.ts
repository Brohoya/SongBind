import { NextApiRequest, NextApiResponse } from "next";

var request = require('request');

export default function handler(req: NextApiRequest, res: NextApiResponse) {

    const oldCookie = JSON.parse(req.body);
    var refresh_token = oldCookie.refresh_token;
    
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
            res.status(200).json({
                access_token: body.access_token, 
                refresh_token: refresh_token,
                expiration_date: Date.now() + body.expires_in * 1000,
                user: oldCookie.user
            });
        } else {
            console.log('REFRESH ERROR');
            res.status(400).json({error: 'Bad request, access_token not refreshed'});
        }
    });
}