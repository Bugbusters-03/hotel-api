

"use strict";
/* --------------------------------- imports -------------------------------- */
require('dotenv').config()
const PORT = process.env.PORT;


/* --------------------------------- express -------------------------------- */
const express  = require('express');
const app  = express();



//RUN
app.listen(PORT, () => console.log('Server is running on:',PORT))