"use strict"
/* -------------------------------------------------------------------------- */
/*                           Hotel API - Token Router                          */
/* -------------------------------------------------------------------------- */

const router = require('express').Router()
const {token} = require('../controllers/tokenController')
 const permissions = require('../middlewares/permission');
router.route('/')
    .get(permissions.isLogin, token.list)
    .post(permissions.isLogin, token.create)

router.route('/:tokenId')
    .get(permissions.isLogin, token.read)
    .put(permissions.isLogin, token.update)
    .patch(permissions.isLogin, token.update)
    .delete(permissions.isLogin, token.delete)

module.exports = router