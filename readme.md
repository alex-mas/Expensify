# Expensify
> React application developed in the course https://www.udemy.com/react-2nd-edition/ 

## Features
- Creating expenses
- Editing/removing expenses
- Visualizing expenses
- Integration with google accounts via firebase


## Stack used
- React (UI)
- Redux (state management)
- Firebase (Database/auth)
- Express (Server)

## Deploying

- First, you need to set up .env.development and .env.test files filling the missing values of this set of keys 
    ```js
    FIREBASE_API_KEY=
    FIREBASE_AUTH_DOMAIN=
    FIREBASE_DATABASE_URL=
    FIREBASE_PROJECT_ID=
    FIREBASE_STORAGE_BUCKET=
    FIREBASE_MESSAGING_SENDER_ID=
    ```
    To do this you will need a firebase account
- Then, transpile the code via 'npm run build:dev' or 'npm run build:prod'
- Finally, run 'npm run start', now the app is locally hosted on the port 3000
