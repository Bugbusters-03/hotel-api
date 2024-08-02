"use strict"
/* -------------------------------------------------------------------------- */
/*                           Hotel API - User Model                           */
/* -------------------------------------------------------------------------- */

const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },

    password: {
        type: String,
        trim: true,
        required: true
    },

    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    
    isActive: {
        type: Boolean,
        default: true
    },

    isAdmin: {
        type: Boolean,
        default: false
    }
},
{   collection: 'users',
    timestamps: true
}
)

module.exports.User = mongoose.model('User', UserSchema)
