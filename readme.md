# MyBank
This project was built with an idea of creating a web app that would help users to better administrate their financial goals, and to practice some JavaScript and Node.js frameworks.

## Get Started - Back-End
This app works around an email authenticaded login feature, so to run this app you'll need to add the mailer account by adding this data on .env:
```plaintext
    MAILER_USER = noresponsemybank@gmail.com
    MAILER_PASS = 123456,.;
```
You will need to add a hash secret and you will need a mongoDB uri, you can use this public uri or if the uri is inactive you can create your on mongoDB URI to .env as well.
```plaintext
    MONGO_URI = mongodb+srv://mybank:mybank@mybank.dnr2v.mongodb.net/myBank?retryWrites=true&w=majority
```
Please, remember if you're going to use this uri, DO NOT use sensible data, this is a public db.  
Then run `yarn` to install project dependencies and to run:
```bash
    yarn dev
```
This will build typescript and run the server.

## Get Started - Front-End
Just run `yarn` then `yarn start` to install dependencies and run the app.
