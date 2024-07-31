"use strict"
/* -------------------------------------------------------------------------- */
/*                          Hotel API - DB Connection                         */
/* -------------------------------------------------------------------------- */

const mongoose = require('mongoose')

module.exports = () => {

    mongoose.connect(process.env?.MONGODB || 'mongodb+srv://edabeyzaozeren:XGNULWMGgB6JaEpg@cluster0.15it6c7.mongodb.net/HotelAPI')
        .then(() => console.log('** DB Connected. **'))
        .catch(() => console.log('-- DB Not Connected. --'))

}
