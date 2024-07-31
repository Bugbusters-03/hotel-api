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
// app.use('/',(req,res)=>{
//     res.send('Welcome to hotel api!')
// })


app.use('/users', require('./src/routes/userRouter'))
app.use('/tokens', require('./src/routes/tokenRouter'))


/* ------------------------------ error handler ----------------------------- */

app.use(require('./src/middlewares/errorHandler'))


//RUN
app.listen(PORT, () => console.log('Server is running on:',PORT));