import express from 'express';
import { client } from '../../db';
import { ObjectId } from 'mongodb';

const db = client.db();
export const goalRoute = express.Router();

export interface IGoal {
    goalId: number,
    finalValue: number,
    dueDate: Date,
    name: string,
    totalValue: number,
    creationDate: Date,
    lastDeposit: Date
}
export interface IUser{
    _id: ObjectId,
    userId: ObjectId,
    name: string,
    goals: IGoal[]
}

goalRoute.post('/goalRegister', (req, res, next) => {
    const necessaryFields = ['value', 'dueDate', 'name', 'userId']
    let cancelLoop = false

    necessaryFields.forEach(value => {
        if (!Object.keys(req.body).includes(value)){
            cancelLoop = true
        }
    })
    
    if (cancelLoop) return res.status(400).send({message: "Campos faltando"}).end();

    next()
     
}, async (req, res) => {

    try{
        const {value, dueDate, name, userId} = req.body
    
        const user= await db.collection('users').findOne({userId: new ObjectId(userId)}) as unknown as IUser

        if (!user){
            return res.status(400).send({message: 'Usuário não encontrado'}).end();
        }

        const goalDate = new Date();

        goalDate.setMonth(goalDate.getMonth() + parseFloat(dueDate))
    
        const goal = {
            goalId: user.goals.length,
            finalValue: parseFloat(value),
            dueDate: goalDate,
            name,
            totalValue: 0,
            creationDate: new Date(),
            lastDeposit: new Date()
        }
    
        await db.collection('users').updateOne({userId: new ObjectId(userId)}, {$set: {goals: [...user.goals, goal]}})

        return res.status(201).send({message: 'Meta adicionada'}).end();

    } catch (err) {
        console.log(err)
        return res.status(400).send({message: 'invalid fields'}).end();
    }

})

goalRoute.put('/goalUpdate/:userId/:goalId', (req, res, next) => {
    const possibleFields = ['name', 'finalValue', 'dueDate']
    let cancelLoop = false

    Object.keys(req.body).forEach(value => {
        if (!possibleFields.includes(value)){
            cancelLoop = true
        }
    })
    
    if (cancelLoop || Object.keys(req.body).length === 0) return res.status(400).send({message: "Campos despadronizados"}).end();

    next()
}, async (req, res) => {
    try {
        const { userId, goalId } = req.params

        const user = await db.collection('users').findOne({userId: new ObjectId(userId)}) as unknown as IUser

        if (!user) {
            return res.status(400).send({message: 'Usuário não encontrado'}).end();
        }

        let goal = user.goals.filter((goal) => goal.goalId === parseInt(goalId))[0] as any
        
        if(!goal){
            return res.status(400).send({message: 'Meta não encontrada'}).end();
        }

        Object.keys(req.body).forEach(value => {
            if (value === 'dueDate'){

                const goalDate = goal.dueDate

                goalDate.setMonth(goalDate.getMonth() + parseInt(req.body.dueDate))

                req.body.dueDate = goalDate
            }
            goal[value] = req.body[value]
        })

        const goals = user.goals.filter((goal) => goal.goalId !== parseInt(goalId))

        goals.push(goal)

        await db.collection('users').updateOne({userId: new ObjectId(userId)}, {$set: {goals: goals}})

        return res.status(200).send({message: 'Meta atualizada!'}).end();

    } catch (err) {
        console.log(err)
        return res.status(400).send({message: 'invalid fields'}).end();
    }
})

goalRoute.delete('/goalDelete/:userId/:goalId', async (req, res) => {
    try{
        const { userId, goalId } = req.params
    
        const user = await db.collection('users').findOne({userId: new ObjectId(userId)})
    
        if (!user){
            return res.status(400).send({message: 'Usuário não encontrado'}).end();
        }

        await db.collection("transactions").deleteMany({userId: new ObjectId(userId), goalId: parseInt(goalId)})
    
        const goals = user.goals.filter((goal: IGoal) => goal.goalId !== parseInt(goalId))
    
        await db.collection('users').updateOne({userId: new ObjectId(userId)}, {$set: {goals}})
    
        return res.status(204).end();
    } catch (err) {
        console.log(err)
        return res.status(500).send({message: 'something went wrong'}).end()
    }
})

goalRoute.get('/goalsList/:userId', async (req, res) => {
    try {
        const { userId } = req.params

        const user = await db.collection('users').findOne({userId: new ObjectId(userId)})

        if (!user){
            return res.status(404).send({message: 'Usuário não encontrado'}).end();
        }

        return res.status(200).send({goals: user.goals}).end()
    } catch (err) {
        console.log(err)
        return res.status(500).send({message: 'something went wrong'}).end()
    }
})

goalRoute.get('/goalsList/:userId/:goalId', async (req, res) => {
    try {
        const { userId, goalId } = req.params

        const user = await db.collection('users').findOne({userId: new ObjectId(userId)})

        if (!user){
            return res.status(404).send({message: 'Usuário não encontrado'}).end();
        }

        return res.status(200).send({goals: user.goals.find((value: IGoal) => value.goalId === parseInt(goalId))}).end()
    } catch (err) {
        console.log(err)
        return res.status(500).send({message: 'something went wrong'}).end()
    }
})