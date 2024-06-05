import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.get('/', (req,res) =>
{
    res.send("Home page");
});

const port =  process.env.PORT || 8080;

app.listen(port, () =>
{
    console.log(`Server is running on port ${port}...`);
});