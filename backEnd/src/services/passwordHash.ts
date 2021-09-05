import { createHmac } from 'crypto';

const passwordHash = (pass: string) => {
    if (pass){
        return createHmac('sha256', process.env.HASH_DATA!)
        .update(pass)
        .digest('hex')
    }

    return ''
}

export default passwordHash