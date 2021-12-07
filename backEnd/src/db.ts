import { MongoClient } from "mongodb";
import { config } from "dotenv";
import { join } from "path";

config({path: join(__dirname, '../.env')})

export const client = new MongoClient(String(process.env.MONGODB_URI))

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