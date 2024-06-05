import express from "express";
import {OAuth2Client} from "google-auth-library"

const router = express.Router();


router.post("/", async (req,res) =>
{
    res.header('Access-Control-Allow-Origin', 'http://localhost:5000');

    // not necessary for a production server
    res.header('referrer-policy', 'no-referrer-when-downgrade'); // This is a security measure to prevent the browser from sending the referrer header to the server.
    
    

    // This is the URL that the user will be redirected to after they have successfully authenticated with Google.
    const redirectUrl = 'http://localhost:5000/response/oauth'; 

    const client = new OAuth2Client(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        redirectUrl
    );

    // in production 
    const authorizationUrl = client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/userinfo.profile openid email'],
        prompt: 'consent',
    });

    res.json({authorizationUrl});
});

export default router;