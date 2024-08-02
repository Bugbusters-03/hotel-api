"use strict";

const jwt = require("jsonwebtoken");
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

    //Token authentication
    let tokenData = await Token.findOne({ userId: user._id });
    if (!tokenData) {
      tokenData = await Token.create({
        userId: user._id,
        token: passwordEncrypt(user._id + Date.now()),
      });
    }

    //jwt token
    const accessData = {
      //short - sensitive infos,
      userId: user._id,
      isAdmin: user.isAdmin,
      isActive: user.isActive,
      username: user.username,
      email: user.email,
    };

    const refreshData = {
      //long - general infos
      username: user.username,
      password: user.password,
    };

    const accesToken = jwt.sign(accessData, process.env.ACCESSTOKEN_SECRETKEY, {
      expiresIn: "30m",
    });

    const refreshToken = jwt.sign(
      refreshData,
      process.env.REFRESHTOKEN_SECRETKEY,
      { expiresIn: "1d" }
    );

    res.json({
      error: false,
      message: "Login is OK!",
      token: tokenData.token,
      userId: tokenData.userId,
      bearer: {
        accesToken,
        refreshToken,
      },
    });
  },

  refresh: async (req, res) => {
    const refreshToken = req.body?.bearer?.refreshToken || null;
    if (!refreshToken) {
      res.errorStatusCode = 401;
      throw new Error("Unauthorized - you should enter bearer.refresh!");
    }

    const refreshData = await jwt.verify(
      refreshToken,
      process.env.REFRESHTOKEN_SECRETKEY
    );

    const user = await User.findOne({ username: refreshData?.username });
    if (!user) {
      res.errorStatusCode = 401;
      throw new Error("Unauthorized - User not found!");
    }
    if (user?.password !== refreshData?.password) {
      res.errorStatusCode = 401;
      throw new Error("Unauthorized - Invalid password!");
    }
    const accessData = {
      userId: user._id,
      isAdmin: user.isAdmin,
      isActive: user.isActive,
      username: user.username,
      email: user.email,
    };

    const accesToken = jwt.sign(accessData, process.env.ACCESSTOKEN_SECRETKEY, {
      expiresIn: "30m",
    });

    res.json({
      error:false,
      message:"Refresh is OK!",
      bearer:{
        accesToken
      }
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
