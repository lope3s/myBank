import express from 'express';
import { client } from '../../db';
import { ObjectId } from 'mongodb';
import { IUser, IGoal } from '../goalsRoutes';



const db = client.db();
export const transactionRoute = express.Router();

transactionRoute.post('/createTransaction', async(req, res) => {
    try {
        const { type, value, userId, goalId } = req.body

        const treatedValue = type === 'Withdraw' ? -1 * value : value

        const transactionObject = {
            userId: new ObjectId(userId),
            goalId,
            type,
            value: treatedValue,
            date: new Date()
        }

        await db.collection('transactions').insertOne(transactionObject)

        const user = db.collection('users').findOne({userId: new ObjectId(userId)}) as unknown as IUser

        let transactionGoal = user.goals.find(goal => goal.goalId === parseInt(goalId))

        if (!transactionGoal){
            return res.status(404).send({message: 'Meta inexistente'}).end();
        }

        transactionGoal["totalValue"] += treatedValue

        const goals = user.goals.filter((goal) => goal.goalId !== parseInt(goalId))

        goals.push(transactionGoal)

        await db.collection('users').updateOne({userId: new ObjectId(userId)}, {$set: {goals: goals}})

        return res.status(201).send({message: 'Transação efetivada!'}).end()

    } catch(err){
        console.log(err)
        return res.status(400).send({message: "missing fields"}).end();
    }
})