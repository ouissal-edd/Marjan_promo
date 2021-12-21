require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const userRouter = require('./router/router')

app.use(express.json());

app.use('/api/users', userRouter);


app.listen(process.env.APP_PORT, () => console.log('started on port ', process.env.APP_PORT));