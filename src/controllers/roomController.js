"use strict";
/* -------------------------------------------------------------------------- */
/*                         Hotel API - Room Controller                        */
/* -------------------------------------------------------------------------- */

const { Room } = require("../models/roomModel");

module.exports.room = {
  list: async (req, res) => {
    const data = await Room.find();

    if (data.length < 1) {
      res.errorStatusCode = 404;
      throw new Error("No Room");
    }

    res.status(200).send({
      error: false,
      message: "Rooms are listed!",
      result: data,
    });
  },

  // CRUD ->

  create: async (req, res) => {
    const { roomNumber, image, bedCount, price } = req.body;
    const data = await Room.create(req.body);

    if (!data) {
      res.errorStatusCode = 500;
      throw new Error("Something went wrong");
    }
    res.status(201).send({
      error: false,
      message: "Room is created!",
      result: data,
    });
  },

  read: async (req, res) => {
    
    const data = await Room.findOne({ _id: req.params.roomId });

    if(!data){
      res.errorStatusCode = 404;
      throw new Error('Room not Found!')
    }

    res.status(200).send({
      error: false,
      message: "Room is listed!",
      result: data,
    });
  },

  update: async (req, res) => {
  

    const room = await Room.findOne({ _id: req.params?.roomId });
    if (!room) {
      res.errorStatusCode = 404;
      throw new Error("Room not found!");
    }

    const data = await Room.updateOne({ _id: req.params?.roomId }, req.body, {runValidators:true});

    if (data?.modifiedCount < 1) {
      res.errorStatusCode = 500;
      throw new Error("Something went wrong !");
    }

    res.status(202).send({
      error: false,
      message: "Room is updated!",
      new: await Room.findOne({ _id: req.params.roomId }),
    });
  },

  delete: async (req, res) => {
    const room = await Room.findOne({ _id: req.params?.roomId });
    if (!room) {
      res.errorStatusCode = 404;
      throw new Error("Room not found!");
    }

    const data = await Room.deleteOne({ _id: req.params.roomId });
    if (data.deletedCount < 1) {
      res.errorStatusCode = 500;
      throw new Error("Something went wrong !");
    }
    res.sendStatus(204);
  },
};
