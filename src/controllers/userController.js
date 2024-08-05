"use strict"
/* -------------------------------------------------------------------------- */
/*                         Hotel API - User Controller                        */
/* -------------------------------------------------------------------------- */

const { User } = require('../models/userModel')
const passwordEncrypt = require('../helpers/passwordEncrypt')

module.exports.user = {

    list: async (req, res) => {
        const data = await User.find();
        
        res.status(200).send({
          error: false,
          message:"Users are listed!",
          result: data,
        });
      },
    
      // CRUD ->
    
      create: async (req, res) => {
    
        const {username, email, password,isActive, isAdmin} = req.body
        const data = await User.create({username, email, password:passwordEncrypt(password), isActive, isAdmin});
    
        res.status(201).send({
          error: false,
          message:"User is created!",
          result: data,
        });
      },
    
      read: async (req, res) => {
        const data = await User.findOne({ _id: req.params.userId });
    
        if(!data){
            res.errorStatusCode = 404;
            throw new Error('user not Found!')
        }
    
        res.status(200).send({
          error: false,
          message:"User is here!",
          result: data,
        });
      },
    
      update: async (req, res) => {

        const {username, email, password,isActive, isAdmin} = req.body
    
        const userData = await User.findOne({_id:req.params?.userId});
        if(!userData){
            res.errorStatusCode = 404;
            throw new Error('User not found!')
        }
    
        const data = await User.updateOne({ _id: req.params.userId }, {username, email, password:passwordEncrypt(password),isActive, isAdmin});
    
        if(data?.modifiedCount < 1){
            res.errorStatusCode = 500;
            throw new Error('Something went wrong !')
        }
    
    
        res.status(202).send({
          error: false,
          message:"User is updated!",
          new: await User.findOne({ _id: req.params.userId }),
        });
      },
    
      delete: async (req, res) => {
    
        const userData = await User.findOne({_id:req.params?.userId});
        if(!userData){
            res.errorStatusCode = 404;
            throw new Error('User not found!')
        }
    
        const data = await User.deleteOne({ _id: req.params.userId });
    
        if(data.deletedCount < 1){
            res.errorStatusCode = 500;
            throw new Error('Something went wrong !')
        }
    
        res.sendStatus(204);
      },
}