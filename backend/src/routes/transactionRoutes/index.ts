import express from 'express';
import { client } from '../../db';
import { ObjectId } from 'mongodb';
import { IUser } from '../goalsRoutes';

const db = client.db();
export const transactionRoute = express.Router();

transactionRoute.post('/createTransaction', async(req, res) => {
    try {
        const { type, value, userId, goalId } = req.body

        const user = await db.collection('users').findOne({userId: new ObjectId(userId)}) as unknown as IUser

        if (!user){
            return res.status(404).send({message: 'user does not exist'}).end();
        }

        const treatedValue = type === 'Withdraw' ? -1 * parseFloat(value) : parseFloat(value)

        let transactionGoal = user.goals.find(goal => goal.goalId === parseInt(goalId))

        if (!transactionGoal){
            return res.status(404).send({message: 'Meta inexistente'}).end();
        }

        transactionGoal["totalValue"] += treatedValue

        const goals = user.goals.filter((goal) => goal.goalId !== parseInt(goalId))

        goals.push(transactionGoal)

        await db.collection('users').updateOne({userId: new ObjectId(userId)}, {$set: {goals: goals}})

        const transactionObject = {
            userId: new ObjectId(userId),
            goalId,
            type,
            value: treatedValue,
            date: new Date(),
            finalValue: transactionGoal.totalValue
        }

        await db.collection('transactions').insertOne(transactionObject)


        return res.status(201).send({message: 'Transação efetivada!'}).end()

    } catch(err){
        console.log(err)
        return res.status(400).send({message: "missing fields"}).end();
    }
})

transactionRoute.get('/transactionList/:userId/:goalId', async (req, res) => {
    const { userId, goalId } = req.params

    const user = await db.collection('users').findOne({userId: new ObjectId(userId)})

    if (!user){
        return res.status(404).send({message: 'user does not exist'}).end();
    }

    const transactionHistory = await db.collection('transactions').aggregate([
        {
            $match: {
                userId: new ObjectId(userId),
                goalId: parseInt(goalId)
            }
        }
    ]).toArray()

    return res.status(200).send({transactionHistory}).end();
})