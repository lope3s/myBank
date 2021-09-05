import { createTransport } from "nodemailer";
import { google } from 'googleapis';
import makeHtml from "./makeHtml";

const oAuthCli = new google.auth.OAuth2(
    process.env.OAUTH_CLIENT_ID, 
    process.env.OAUTH_CLIENT_SECRET, 
    process.env.OAUTH_REDIRECT_URI
)

oAuthCli.setCredentials({refresh_token: process.env.OAUTH_REFRESH_TOKEN})

export const makeTransport = async () => {

    
    const accesToken = await oAuthCli.getAccessToken() as string

    const transporter = createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: process.env.MAILER_USER,
            clientId: process.env.OAUTH_CLIENT_ID,
            clientSecret: process.env.OAUTH_CLIENT_SECRET,
            refreshToken: process.env.OAUTH_REFRESH_TOKEN,
            accessToken: accesToken
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