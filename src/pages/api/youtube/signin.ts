import { NextApiRequest, NextApiResponse } from "next";
const {google} = require('googleapis');

export default async function handler (req: NextApiRequest, res: NextApiResponse) {

    var protocol = 'https';
    const host = req.headers.host;

    if(req.headers.host === 'localhost:3000') {
        protocol = 'http';
    }

    if(req.headers.referer === `${protocol}://${req.headers.host}/platforms`) {
        const redirect_uri = `${protocol}://${host}/api/youtube/callback`;

        const oauth2Client = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri
        );

        const scopes = [
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/youtube.readonly',
            'https://www.googleapis.com/auth/youtube',
        ];

        const url = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: scopes.join(' '),
        });
    
        res.redirect(url);
    } else {
        res.redirect(403, `${protocol}://${req.headers.host}`)
    }
}
