"use strict"
/* -------------------------------------------------------------------------- */
/*                          Hotel API - DB Connection                         */
/* -------------------------------------------------------------------------- */

const mongoose = require('mongoose')

module.exports = () => {

    mongoose.connect(process.env?.MONGODB )
        .then((connect) => console.log('** DB Connected. **',connect.connection.host,connect.connection.name))
        .catch((err) => console.log('-- DB Not Connected. --',err))

}
