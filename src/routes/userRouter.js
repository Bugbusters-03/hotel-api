"use strict"
/* -------------------------------------------------------------------------- */
/*                           Hotel API - User Router                          */
/* -------------------------------------------------------------------------- */

const router = require('express').Router()
const {user} = require('../controllers/userController')
const permissions = require('../middlewares/permission')

router.route('/')
    .get(permissions.isLogin, user.list)
    .post(user.create)

router.route('/:userId')
    .get(permissions.isLogin, user.read)
    .put(permissions.isLogin, user.update)
    .patch(permissions.isLogin, user.update)
    .delete(permissions.isAdmin ,user.delete)

module.exports = router