import express from 'express';
import { client } from '../../db';
import { v4 } from 'uuid';
import passwordHash from '../../services/passwordHash';
import { accountRoute } from '../accountsRoutes';
import { ObjectId } from 'bson';

const db = client.db();
export const accessRoute = express.Router();

accessRoute.post('/login', async (req, res) => {
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

            const id = v4()

            await db.collection('login').updateOne({_id: user[0]._id}, {$set: {token: id, isLogged: true}})

            const loggedUser = await db.collection('users').findOne({userId: user[0]._id})

            delete loggedUser!._id

            return res.status(200).send({token: id, ...loggedUser}).end();
        }

        return res.status(400).send({message: 'Dados inválidos'}).end();

    } catch(err) {
        console.log(err)
        return res.status(400).send({message: 'invalid fields'}).end();
    }
})

accountRoute.post('/checkLogin', async (req, res) => {
    try {
        const { token } = req.body

        const userData = await db.collection('login').findOne({token: token})

        if (!userData){
            return res.status(400).send({message: 'Sua sessão expirou'}).end()
        }

        if(!userData.isLogged){
            return res.status(403).send({message: 'Faça login'}).end()
        }

        return res.status(200).end();

    } catch (error) {
        console.log(error)
        return res.status(400).send({message: 'invalid fields'}).end();
    }
})

accountRoute.get('/logout/:userId', async (req, res) => {
    const { userId } = req.params

    const user = await db.collection('login').findOne({_id: new ObjectId(userId)})

    if (!user){
        return res.status(400).send({message: 'user does not exist'}).end()
    }

    await db.collection('login').updateOne({_id: new ObjectId(userId)}, {$set: {isLogged: false, token: v4()}})

    return res.status(204).end();
})