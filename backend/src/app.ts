import express from 'express';
import cors from 'cors';
import { accountRoute } from './routes/accountsRoutes';
import { goalRoute } from './routes/goalsRoutes';
import { transactionRoute } from './routes/transactionRoutes';
import { main } from './db';
import bodyParser from 'body-parser';
import { makeTransport } from './services/mailerService';
import { accessRoute } from './routes/accesRoutes';
import keepServerAlive from './services/keepServerAliver';

const app = express();

app.use(cors());

app.use(bodyParser.json())

app.use('/apiMyBank', accountRoute)

app.use('/apiMyBank', goalRoute)

app.use('/apiMyBank/', transactionRoute)

app.use('/apiMyBank', accessRoute)

app.get('/', (req, res) => {
    console.log('revalidation')
    keepServerAlive('https://mybankbacksideserver.herokuapp.com/')
    return res.status(200).end()
})

app.listen(process.env.PORT || 5001, async () => {
    await main();

    const transporter = await makeTransport()

    transporter?.verify((err: any, _succes: any) => {
        if (err) {
            console.log(err)
        } else {
            console.log('\nMailer service is ON.')
        }
    })
    
    console.log(`\nServer running on port ${process.env.PORT || 5001}`);
    
})