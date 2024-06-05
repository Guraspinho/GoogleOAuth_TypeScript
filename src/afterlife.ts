import express from 'express';
import dotenv from 'dotenv';
import requestRouter from './routes/request';
import responseRouter from './routes/response';

dotenv.config();

const app = express();

app.use(requestRouter);
app.use(responseRouter);


app.get('/', (req,res) =>
{
    res.send("Home page");
});

const port =  process.env.PORT || 8080;

app.listen(port, () =>
{
    console.log(`Server is running on port ${port}...`);
});