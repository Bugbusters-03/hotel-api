"use strict"

const crypto = require('node:crypto')
const secret_key = process.env.SECRET_KEY
const key_loop = 10000
const char_lenght = 32
const encrypt_type = 'sha512'

const passwordEncrypt = (password) => {
    return crypto.pbkdf2Sync(password, secret_key, key_loop, char_lenght, encrypt_type).toString('hex')
}

module.exports = passwordEncrypt