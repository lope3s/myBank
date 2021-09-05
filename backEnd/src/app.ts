import express from 'express';
import cors from 'cors';
import { accountRoute } from './routes/accountsRoutes';
import { goalRoute } from './routes/goalsRoutes';
import { transactionRoute } from './routes/transactionRoutes';
import { main } from './db';
import bodyParser from 'body-parser';
import { makeTransport } from './services/mailerService';
import { loginRoute } from './routes/loginRoute';

const app = express();

app.use(cors());

app.use(bodyParser.json())

app.use('/apiMyBank', accountRoute)

app.use('/apiMyBank', goalRoute)

app.use('/apiMyBank/', transactionRoute)

app.use('/apiMyBank', loginRoute)

app.listen(5001, async () => {
    await main();
    const transporter = await makeTransport()

    transporter.verify((err, _succes) => {
        if (err) {
            console.log(err)
        } else {
            console.log('\nMailer service is ON.')
        }
    })

    console.log("\nServer running on port 5001");
})