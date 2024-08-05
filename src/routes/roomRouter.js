"use strict"
/* -------------------------------------------------------------------------- */
/*                           Hotel API - User Router                          */
/* -------------------------------------------------------------------------- */

const router = require('express').Router()
const {room} = require('../controllers/roomController')

router.route('/')
    .get(room.list)
    .post(room.create)

router.route('/:roomId')
    .get(room.read)
    .put(room.update)
    .patch(room.update)
    .delete(room.delete)

module.exports = router