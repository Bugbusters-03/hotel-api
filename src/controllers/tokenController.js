"use strict";
/* -------------------------------------------------------------------------- */
/*                         Hotel API - Token Controller                        */
/* -------------------------------------------------------------------------- */

const { Token } = require("../models/tokenModel");
const { User } = require("../models/userModel");

module.exports.token = {
  list: async (req, res) => {
    const data = await Token.find();
    
    res.status(200).send({
      error: false,
      message:"Tokens are listed!",
      result: data,
    });
  },

  // CRUD ->

  create: async (req, res) => {
    const {userId} = req.body;

    const user = await User.findOne({_id:userId});
    if(!user){
        res.errorStatusCode = 404;
        throw new Error('User not found on Users!')
    }

    const data = await Token.create(req.body);

    res.status(201).send({
      error: false,
      message:"Token is created!",
      result: data,
    });
  },

  read: async (req, res) => {
    const data = await Token.findOne({ _id: req.params.tokenId });

    if(!data){
        res.errorStatusCode = 404;
        throw new Error('token not Found!')
    }

    res.status(200).send({
      error: false,
      message:"Token is here!",
      result: data,
    });
  },

  update: async (req, res) => {
    const {userId} = req.body;

    const user = await User.findOne({_id:userId});
    if(!user){
        res.errorStatusCode = 404;
        throw new Error('User not found!')
    }



    const tokenData = await Token.findOne({_id:req.params?.tokenId});
    if(!tokenData){
        res.errorStatusCode = 404;
        throw new Error('Token not found!')
    }

    const data = await Token.updateOne({ _id: req.params.tokenId }, req.body);

    if(data?.modifiedCount < 1){
        res.errorStatusCode = 500;
        throw new Error('Something went wrong !')
    }


    res.status(202).send({
      error: false,
      message:"Token is updated!",
      new: await Token.findOne({ _id: req.params.tokenId }),
    });
  },

  delete: async (req, res) => {

    const tokenData = await Token.findOne({_id:req.params?.tokenId});
    if(!tokenData){
        res.errorStatusCode = 404;
        throw new Error('Token not found!')
    }

    const data = await Token.deleteOne({ _id: req.params.tokenId });

    if(data.deletedCount < 1){
        res.errorStatusCode = 500;
        throw new Error('Something went wrong !')
    }

    res.sendStatus(204);
  },
};
