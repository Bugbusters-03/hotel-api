"use strict";
/* -------------------------------------------------------------------------- */
/*                           Hotel API - Token Model                           */
/* -------------------------------------------------------------------------- */

const mongoose = require("mongoose");

const ReservationModel = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    checkin_date: {
      type: Date,
      required: true,
    },
    checkout_date: {
      type: Date,
      required: true,
    },
    guest_number: {
      type: Number,
      default: 1,
    },
    night: {
      type: Number,
      default: function () {
        const difference = new Date(this.checkout_date) - new Date(this.checkin_date);
        const night = Math.floor(difference / (1000 * 60 * 60 * 24));
        return night;
      },
      transform: function () {
        const difference = new Date(this.checkout_date) - new Date(this.checkin_date);
        const night = Math.floor(difference / (1000 * 60 * 60 * 24));
        return night;
      },
    },
    price: {
      // room price
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      default: function () {
        return this.price * this.night;
      },
      transform: function () {
        return this.price * this.night;
      },
    },
  },
  {
    collections: "reservations",
    timestamps: true,
  }
);

module.exports.Reservation = mongoose.model("Reservation", ReservationModel);
