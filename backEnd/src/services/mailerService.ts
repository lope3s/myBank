import { createTransport } from "nodemailer";
import makeHtml from "./makeHtml";

export const makeTransport = async () => {

    const transporter = createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.MAILER_USER,
            pass: process.env.MAILER_PASS
        }
    })

    return transporter
}



export const sendMail = async(to: string, activateUrl: string) => {

    const transporter = await makeTransport()

    const message = {
        from: 'MyBank <mybankmailerservice@gmail.com>',
        to: to,
        subject: "Account Activate",
        html: makeHtml(to, activateUrl)
    }

    await transporter.sendMail(message)

    return
}