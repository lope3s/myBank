import express from 'express';
import cors from 'cors';
import { accountRoute } from './routes/accountsRoutes';
import { goalRoute } from './routes/goalsRoutes';
import { transactionRoute } from './routes/transactionRoutes';
import { main } from './db';
import bodyParser from 'body-parser';

const app = express();

app.use(cors());

app.use(bodyParser.json())

app.use('/apiMyBank', accountRoute)

app.use('/apiMyBank', goalRoute)

app.use('/apiMyBank/', transactionRoute)

app.listen(5001, async () => {
    await main();
    console.log("\nServer running on port 5001");
})