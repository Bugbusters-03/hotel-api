"use strict"
/* -------------------------------------------------------------------------- */
/*                           Hotel API - Token Router                          */
/* -------------------------------------------------------------------------- */

const router = require('express').Router()
const {token} = require('../controllers/tokenController')

router.route('/')
    .get(token.list)
    .post(token.create)

router.route('/:tokenId')
    .get(token.read)
    .put(token.update)
    .patch(token.update)
    .delete(token.delete)

module.exports = router