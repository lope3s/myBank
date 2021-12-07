# MyBank
This project was built with an idea of creating a web app that would help users to better administrate theis financial goals, and to pratice some JavaScript and Node.js frameworks.

## Get Started - Back-End
This app works around an email authenticaded login feature, so in matter to run this app you'll need to add the mailer account by adding this data on .env:
```plaintext
    MAILER_USER = noresponsemybank@gmail.com
    MAILER_PASS = 123456,.;
```
You will need to create a hash secret and your mongoDB URI to .env as well.  
Then run `yarn` to install project dependencies and to run:
```bash
    yarn dev
```
This will build typescript and run the server.

## Get Started - Front-End
Just run `yarn` then `yarn start` to install dependencies and run the app.
