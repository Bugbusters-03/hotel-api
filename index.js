"use strict";

/* --------------------------------- imports -------------------------------- */
require("dotenv").config();
const PORT = process.env.PORT || 8000;
/* -------------------------- express-async-errors -------------------------- */
require("express-async-errors");

/* --------------------------------- express -------------------------------- */
const express = require("express");
const app = express();

/* --------------------------------- dbConnection -------------------------------- */
require("./src/config/dbConnection")();

/* ------------------------------- Middlewares ------------------------------ */
//bodyparser
app.use(express.json());
//authentication
app.use(require("./src/middlewares/authentication"));

/* --------------------------------- routes --------------------------------- */
app.all("/", (req, res) => {
  res.send({
    message: "Welcome to hotel api!",
    user: req.user,
    token: req.token,
  });
});

app.use("/users", require("./src/routes/userRouter"));
app.use("/tokens", require("./src/routes/tokenRouter"));
app.use("/auth", require("./src/routes/authRouter"));
app.use('/rooms', require('./src/routes/roomRouter') )
app.use('/reservations', require('./src/routes/revervationRouter') )

/* ------------------------------ error handler ----------------------------- */

app.use(require("./src/middlewares/errorHandler"));

//RUN
app.listen(PORT, () => console.log("Server is running on:", PORT));

