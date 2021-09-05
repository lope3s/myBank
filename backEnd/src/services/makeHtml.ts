const makeHtml = (destiny: string, url: string) => {
    return (`
        <!DOCTYPE html>
            <html>
                <head>
                    <link rel="stylesheet" href="./style.css">
                </head>
                <body style = "width:30%;height:100%;background-color:#e9ecef;font-family:'Red Hat Display';">
                    <div id = 'mainDiv' style = "border:2px solid #000;border-radius:10px;padding:20px;">
                        <img src = "https://res.cloudinary.com/weex/image/upload/v1630862345/myBankLogo_hov4rv.png" alt = "logo MyBank" width = "200">
                        <h1 style = "color: #000;">
                            Ative sua conta MyBank
                        </h1>
                        <p style = "color: #000;front-size: 1.25rem">
                            Uma solicitação para criação de conta foi enviada para  ${destiny}.
                        </p>
                        <p style = "color: #000;">
                            Para ativar sua conta clique <a href = "${url}">aqui</a>.
                        </p>
                        <p style = "color: #000;">
                            Caso você não tenha feito essa solicitação, por favor desconsidere este e-mail
                        </p>
                    </div>
                </body>
            </html>
    `)
}

export default makeHtml