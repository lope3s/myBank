import express from 'express';
import { client } from '../../db';
import { v4 } from 'uuid';
import passwordHash from '../../services/passwordHash';

const db = client.db();
export const loginRoute = express.Router();

loginRoute.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await db.collection('login').aggregate([
            {
              $match: {
                email: email,
                password: passwordHash(password),
              },
            },
        ]).toArray()

        if (user.length > 0){

            if(!user[0].isValidated){
                return res.status(400).send({message: "Ative sua conta!"}).end();
            }
            
            await db.collection('login').updateOne({_id: user[0]._id}, {$set: {token: v4(), isLogged: true}})

            const loggedUser = await db.collection('users').findOne({userId: user[0]._id})

            return res.status(200).send(loggedUser).end();
        }

        return res.status(400).send({message: 'Dados inválidos'}).end();

    } catch(err) {
        console.log(err)
        return res.status(400).send({message: 'invalid fields'}).end();
    }
})