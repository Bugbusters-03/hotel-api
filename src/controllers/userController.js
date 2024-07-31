"use strict"
/* -------------------------------------------------------------------------- */
/*                         Hotel API - User Controller                        */
/* -------------------------------------------------------------------------- */

const User = require('../models/userModel')

module.exports = {

    list: async (req, res) => {

        const data = await User.find()

        res.status(200).send({
            error: false,
            result: data
        })

    },

    // CRUD ->

    create: async (req, res) => {

        const data = await User.create(req.body)

        res.status(201).send({
            error: false,
            result: data
        })

    },

    read: async (req, res) => {

        const data = await User.findOne({ _id: req.params.userId })

        res.status(200).send({
            error: false,
            result: data
        })
    },

    update: async (req, res) => {

        const data = await User.updateOne({ _id: req.params.userId }, req.body) 
        res.status(202).send({
            error: false,
            result: data,
            new: await User.findOne({ _id: req.params.userId }) 
        })

    },

    delete: async (req, res) => {

        const data = await User.deleteOne({ _id: req.params.userId })

        res.status(204).send({
            error: false,
            result: data
        })
    }
}