"use strict";
/* -------------------------------------------------------------------------- */
/*                           Hotel API - Token Model                           */
/* -------------------------------------------------------------------------- */

const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },
    token: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      index: true,
    },
  },
  {
    collections: "tokens",
    timestamps: true,
  }
);

module.exports.Token = mongoose.model("Token", TokenSchema);
