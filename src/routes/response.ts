import express from "express";
import {OAuth2Client} from "google-auth-library"

const router = express.Router();

async function getUserData(access_token: string)
{
    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
    const data = await response.json();
    console.log(data);

}

router.get('/oauth', async (req,res) =>
{
    const code = req.query.code;
    console.log(code);

    if (typeof code !== 'string')
    {
        res.status(400).send('invalid request');
        return;
    }

    try {
        const redirectUrl = 'http://localhost:5000/response/oauth';
        const client = new OAuth2Client(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            redirectUrl
        );  
        const googleResponse = await client.getToken(code);
        await client.setCredentials(googleResponse.tokens);
        console.log('Token set!');

        const user = client.credentials;
        if (typeof user !== 'object' || !('access_token' in user) || typeof user.access_token !== 'string')
        {
            res.status(400).send('invalid request');
            return;
        }

        console.log('credentials',user);

        await getUserData(user.access_token);

        res.json({msg:'Success'});
    } catch (error) {
        console.error(error);
    }
});

export default router;