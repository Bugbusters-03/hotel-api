"use strict";

const { auth } = require('../controllers/authController');




const router = require('express').Router();

router.post('/login',auth.login)
router.get('/logout',auth.logout)
router.post('/refresh',auth.refresh)


module.exports = router;