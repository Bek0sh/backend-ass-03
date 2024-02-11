# Assignment 3

## To start app

``` bash
node backend/app.js
```

after you need to go localhost:3000/login

if do not have an account you must register

#### To become an admin
While registering enter USERNAME=bekarys PASSWORD=bekarys

#### To check admin panel
After registering - log in with this credentials, and you will see button admin, which is only for admins, where you can delete user or create

## Two OpenAPIs

#### 1st

1st OpenApi is News, you can check it in main page, you can have access only if you are logged in
You can input any topic, and check for news related

#### 2nd 

2nd is Pixabay, it is openApi to find a lot of pictures for some topics which you can also input





### Note 
you may have some problems with bcrypt
just try to reinstall it

``` sh
npm uninstall bcrypt
npm install bcrypt
```