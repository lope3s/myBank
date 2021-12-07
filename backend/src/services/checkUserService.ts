import { client } from "../db";

const checkUserService = async (collection: string, email: string): Promise<boolean> => {
    const db = client.db()

    const user = await db.collection(collection).findOne({email: email})

    if(user){
        return true
    }

    return false
}

export default checkUserService