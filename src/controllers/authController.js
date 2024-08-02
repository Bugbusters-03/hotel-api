"use strict";

const passwordEncrypt = require("../helpers/passwordEncrypt");
const { Token } = require("../models/tokenModel");
const { User } = require("../models/userModel");

/* -------------------------------------------------------------------------- */
/*                         Hotel API - Auth Controller                        */
/* -------------------------------------------------------------------------- */

module.exports.auth = {
  login: async (req, res) => {
    const { username, email, password } = req.body;
    if (!(username || email) || !password) {
      res.errorStatusCode = 400;
      throw new Error(
        "Bad request - username/email and password is required for login!"
      );
    }

    const user = await User.findOne({ $or: [{ username }, { email }] });
    if (!user) {
      res.errorStatusCode = 401;
      throw new Error("Unauthorized - User not Found!");
    }

    if (user.password !== passwordEncrypt(password)) {
      res.errorStatusCode = 401;
      throw new Error("Unauthorized - Invalid password!");
    }

    //check if the user is a active user
    if (!user.isActive) {
      res.errorStatusCode = 401;
      throw new Error("Unauthorized - this user is not active!!");
    }

    let tokenData = await Token.findOne({ userId: user._id });
    if (!tokenData) {
      tokenData = await Token.create({
        userId: user._id,
        token: passwordEncrypt(user._id + Date.now()),
      });
    }

    res.json({
      error: false,
      message: "Login is OK!",
      token: tokenData.token,
      userId: tokenData.userId,
    });
  },
  logout: async (req, res) => {
    const { deletedCount } = await Token.deleteOne({ token: req.token });

    res.json({
      error: false,
      message: "Logout is OK!",
      tokenDeleted: Boolean(deletedCount),
    });
  },
};
