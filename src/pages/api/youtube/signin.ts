import { NextApiRequest, NextApiResponse } from "next";

export default async function handler (req: NextApiRequest, res: NextApiResponse) {

    var protocol = 'https';
    const host = req.headers.host;

    if(req.headers.host === 'localhost:3000') {
        protocol = 'http';
    }

    if(req.headers.referer === `${protocol}://${req.headers.host}/platforms`) {
    
        res.redirect('');
    } else {
        res.redirect(403, `${protocol}://${req.headers.host}`)
    }
}
