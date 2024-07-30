

"use strict";
/* --------------------------------- imports -------------------------------- */
require('dotenv').config()
const PORT = process.env.PORT;


/* --------------------------------- express -------------------------------- */
const express  = require('express');
const app  = express();

app.use('/',(req,res)=>{
    res.send('Welcome to hotel api!')
})

//RUN
app.listen(PORT, () => console.log('Server is running on:',PORT));