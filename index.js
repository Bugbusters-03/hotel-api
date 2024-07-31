"use strict";

/* --------------------------------- imports -------------------------------- */
require('dotenv').config()
const PORT = process.env.PORT || 8000


/* --------------------------------- express -------------------------------- */
const express  = require('express');
const app  = express();


app.use(express.json())

/* -------------------------- express-async-errors -------------------------- */
require('express-async-errors')


/* --------------------------------- dbConnection -------------------------------- */
require('./src/config/dbConnection')()


/* --------------------------------- routes --------------------------------- */
app.use('/',(req,res)=>{
    res.send('Welcome to hotel api!')
})


app.use('/user', require('./src/routes/userRouter'))

//RUN
app.listen(PORT, () => console.log('Server is running on:',PORT));