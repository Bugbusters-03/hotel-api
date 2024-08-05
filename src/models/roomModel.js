"use strict"
/* -------------------------------------------------------------------------- */
/*                         Hotel API - User Controller                        */
/* -------------------------------------------------------------------------- */
const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
    roomNumber: {
        type: Number,
        required:true,
        unique: true
    },
    image:{
        type: String,
        trim: true,
        required:true,
        unique: true
    },
    // bedType:{
    //     type: String,
    //     trim: true,
    //     enum:['King','Family','Double', 'Single', 'Baby'],
    //     default: 'Double'   
    // },
    bedCount:{
        type: Number, 
        required: true,
        enum:[1,2,3,4,5],
        default: 1   
    },
    price:{
        type: Number,
        required: true        
    }
},{
   collections:"Room",
   timestamps: true 
})

module.exports.Room = mongoose.model('Room', RoomSchema)