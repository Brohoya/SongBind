import Cookies from 'cookies';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse//<Data>
) {
    var cookies = new Cookies(req, res);
    cookies.set('songbind_spotify_auth', '');
    
    res.redirect('/platforms/');
}