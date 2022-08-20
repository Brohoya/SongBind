import { NextApiRequest, NextApiResponse } from "next";
import { scopes } from "../../../lib/Spotify";

const generateRandomString = (length) => {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

export default async function handler (req: NextApiRequest, res: NextApiResponse) {

    var protocol = 'https';
    const host = req.headers.host;

    if(req.headers.host === 'localhost:3000') {
        protocol = 'http';
    }

    if(req.headers.referer === `${protocol}://${req.headers.host}/platforms`) {
        const redirect_uri = `${protocol}://${host}/api/soundCloud/callback`;
    
        
    
        res.redirect('/platforms/');
    } else {
        res.redirect(403, `${protocol}://${req.headers.host}`)
    }
}
