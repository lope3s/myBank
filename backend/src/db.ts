import { MongoClient } from "mongodb";
import { config } from "dotenv";
import { join } from "path";

config({path: join(__dirname, '../.env')})

const dbUri = String(process.env.MONGO_URI)

export const client = new MongoClient(dbUri)

export const main = async () => {
    try{
        await client.connect()
        .then(res => console.log(res))
        .catch(err => console.log(err))
        return
    } catch (err) {
        console.log(err)
        return
    }
}