"use strict"
/* -------------------------------------------------------------------------- */
/*                           Hotel API - User Model                           */
/* -------------------------------------------------------------------------- */

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

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
})

module.exports = mongoose.model('User', userSchema)