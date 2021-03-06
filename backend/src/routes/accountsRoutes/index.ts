import express from 'express';
import { client } from '../../db';
import checkUserService from '../../services/checkUserService';
import passwordHash from '../../services/passwordHash';
import { ObjectId } from 'mongodb';
import { sendMail } from '../../services/mailerService';

const db = client.db();
export const accountRoute = express.Router();

accountRoute.post('/accountRegister', async (req, res) => {
    try {
        const {name, email, password} = req.body

        const userAlreadyExist = await checkUserService("login", email)

        const passHash = passwordHash(password)

        if (!passHash) return res.status(400).send({message: 'Senha não pode ser vazia'}).end();
        
        if(!userAlreadyExist){
            await db.collection("login").insertOne({
                email: email,
                password: passHash,
                isValidated: false,
                isLogged: false,
                token: ''
            }).then((resp) => {                
                db.collection("users").insertOne({
                    userId: resp.insertedId,
                    name: name,
                    goals: []
                })

                const url = String(process.env.NODE_ENV) === 'production' ? `https://mybankk.vercel.app/${resp.insertedId}` : `http://localhost:3000/${resp.insertedId}`

                sendMail(email, url)

            })

            return res.status(201).send({message: 'Usuários registrado!'}).end()
        }

        return res.status(400).send({message: 'E-mail já cadastrado'}).end();
        
    } catch (err) {
        console.log(err)
        return res.status(404).send({message: 'inválid fields'}).end();
    }
})

accountRoute.delete('/accountDelete/:id', async (req, res) => {
    try {
        const { id } = req.params
        await db.collection('login').deleteOne({_id: new ObjectId(id)})
        .then(resp => {
            if (!resp.deletedCount){
                return res.status(404).send({message: 'User not found'}).end();
            }
        })

        await db.collection('users').deleteOne({userId: new ObjectId(id)})

        await db.collection('transactions').deleteMany({userId: new ObjectId(id)})

        return res.status(204).end()

    } catch (err){
        console.log(err)
        return res.status(500).send({message: 'internal error'}).end()
    }
})

accountRoute.put('/accountUpdate/:id', async (req, res, next) => {
    try{
        const { id } = req.params 

        const availableFields = ['name', 'email', 'password']

        const bodyToArray = Object.keys(req.body)

        let cancelLoop = false
        
        bodyToArray.forEach( async (value) => {
            if (!availableFields.includes(value)){
                cancelLoop = true
                return res.status(400).send({message: 'invalid fields'}).end();
            }
        })

        if (!cancelLoop){
            for (let index = 0; index < bodyToArray.length; index++){
                if(bodyToArray[index] === 'name'){
                    await db.collection('users').updateOne({userId: new ObjectId(id)}, {$set: {name: req.body.name}})
                    continue
                }
                
                if (bodyToArray[index] === 'password'){
                    const hashPass = passwordHash(req.body.password)
                    
                    if (hashPass){
                        await db.collection('login').updateOne({userId: new ObjectId(id)}, {$set: {password: hashPass}})
                        continue
                    } else {
                        cancelLoop = true
                        break
                    }
                }

                await db.collection('login').updateOne({_id: new ObjectId(id)}, {$set: {email: req.body.email}})
            }

            if(cancelLoop){
                return res.status(400).send({message: 'Senha não pode ficar em branco'}).end()
            }
            
            return res.status(200).send({message: 'Campos atualizados!'}).end()
        }

    } catch (err) {
        console.log(err)
        return res.status(400).send({message: 'invalid fields'}).end()
    }
})

accountRoute.get('/accountActivate/:userId', async (req, res) => {
    const { userId } = req.params

    const user = await db.collection('login').findOne({_id: new ObjectId(userId)})

    if (!user){
        return res.status(404).send({message: 'Usuário não encontrado'}).end();
    }

    await db.collection('login').updateOne({_id: new ObjectId(userId)}, {$set: {isValidated: true}});

    return res.status(200).send({message: 'Conta ativada!'}).end();
})