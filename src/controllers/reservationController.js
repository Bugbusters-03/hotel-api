"use strict";
/* -------------------------------------------------------------------------- */
/*                         Hotel API - Reservation Controller                        */
/* -------------------------------------------------------------------------- */

const { Reservation } = require("../models/reservationModel");
const { Room } = require("../models/roomModel");
const { User } = require("../models/userModel");

module.exports.reservation = {
  list: async (req, res) => {
    const data = await Reservation.find();

    res.status(200).send({
      error: false,
      message: "Reservations are listed!",
      result: data,
    });
  },

  // CRUD ->

  create: async (req, res) => {
    const {
      userId,
      roomId,
      checkin_date,
      checkout_date,
      guest_number,
      price,
      totalPrice,
    } = req.body;

    //* test-ok
    if (!userId || !checkin_date || !checkout_date) {
      res.errorStatusCode = 400;
      throw new Error(
        "userId, checkin_date,checkout_date fields are required!"
      );
    }
  
    //* test-ok
    //guest number validation check =>  
    if (guest_number || guest_number === 0 ) {
        //if guest number is entered! 
        if (guest_number > 5 || guest_number < 1) { 
        // checking with 1 - to 5,
        //because it should match with the rooms bedcount.
        res.errorStatusCode = 400;
        throw new Error("Invalid guest number! [1 to 5]");
      }
    } 

    
    const isCheckInBigger = new Date(checkin_date) >= new Date(checkout_date);
    const isValidDate = new Date(checkin_date) < new Date();
    // console.log("isCheckInBigger", isCheckInBigger);
    // console.log("isValidDate", isValidDate);
    // console.log('isCheckInBigger || isValidDate', isCheckInBigger || isValidDate)
    
    //* test-ok
    //checkin date cant be less or equal to checkout date 
    if (isCheckInBigger ) {
      res.errorStatusCode = 400;
      throw new Error("Invalid date - checkin date cant be less or equal to checkout date !");
    }

    //* test-ok
    //Checkin date can't be less than current day 
    if (isValidDate ) {
      res.errorStatusCode = 400;
      throw new Error("Checkin date can't be less than current day!");
    }

    //* test-ok
    //check if user is exist on users
    const user = await User.findOne({ _id: userId });
    if (!user) {
      res.errorStatusCode = 404;
      throw new Error("User not found on Users!");
    }

    //check if room is exist on rooms or if rrom is not entered then  assign a room if conditions are ok!
    let room;
    let rooms;
    let data;

    if (roomId) {
      //if room id is entered
      room = await Room.findOne({ _id: roomId });
      if (!room) {
        // if the room which user asked is not exist
        res.errorStatusCode = 404;
        throw new Error("Room is entered and it is not found on Rooms!");
      } 
        //if the room which user asked is exist!
        //CONDITIONS =>
        //1- guest

        //alternative to guestNumber check ->

        //* test-ok
        if (guest_number) {
          if (guest_number !== room.bedCount) {
            res.errorStatusCode = 400;
            throw new Error(
              "Selected room's bedCount and guestNumber are not matched!!"
            );
          }
        } else {
          if (room.bedCount !== 1) {
            res.errorStatusCode = 400;
            throw new Error(
              "Default guest number is 1 and selected room's bedcount is not 1!"
            );
          }
        }

        //2- date
        const avaliableDate = await Reservation.find({
          roomId,
          $nor: [
            { checkin_date: { $gt: req.body.checkout_date } },
            { checkout_date: { $lt: req.body.checkin_date } },
          ],
        });
        
        if (avaliableDate.length > 0) {
          res.errorStatusCode = 404;
          throw new Error(
            "Room not found on selected date and room!"
          );
        }

        // room entered version conditions are ok=>
        //then add the selected rooms price to the req body->
        req.body.price = room.price;
        //Anymore reservation will be created!

      
    } else {
      //if room id is not entered!

      //CONDITIONS=>

      //* test-ok
      //1- guest number check->
      if (guest_number) {
        // guest number should match with the bedcount of a room in rooms
        rooms = await Room.find({ bedCount: guest_number });
      } else {
        //when guest number is not entered, it is 1 as default, so i should search the rooms with 1 bed.
        rooms = await Room.find({ bedCount: 1 });
      }
    //   console.log('room=', room);

      //alternative to guestNumber check ->
      // room = await Room.findOne({ bedCount: guest_number || 1 });

      //* test-ok
      if (rooms.length < 1) {
        //if room couldnt be found with the guest number as bedcount
        res.errorStatusCode = 404;
        throw new Error("Room not found with has same bedCount with asked guest_number!");
      }

      //now we found the rooms we can select with the guestt_number
      //now i should make the date filterin in theese rooms->

      //checking the avaiable date=>
      //search the asked dates in reservation collection with date filter.
      // oldReservs.start > askedReserv.end
      // oldReservs.end < askedReserv.start
      //* test-ok
      const avaliableDate = await Reservation.find({
        roomId: { $in: rooms.map(room=> room._id) } //make the filter between the rooms which have the correct bedCount number!
        ,
        $nor: [
          { checkin_date: { $gt: req.body.checkout_date } },
          { checkout_date: { $lt: req.body.checkin_date } },
        ],
      }); 

      if (avaliableDate?.length > 0) {
        res.errorStatusCode = 404;
        throw new Error("Room not found on asked date!");
      } else {
        //reser
        req.body.roomId = rooms[0]._id;
        req.body.price = rooms[0].price;
      }
    }

    data = await Reservation.create(req.body);
    res.status(201).send({
      error: false,
      message: "Reservation is created!",
      result: data,
    });
  },

  read: async (req, res) => {
    const data = await Reservation.findOne({ _id: req.params.reservationId });

    if (!data) {
      res.errorStatusCode = 404;
      throw new Error("reservation not Found!");
    }

    res.status(200).send({
      error: false,
      message: "Reservation is here!",
      result: data,
    });
  },

  update: async (req, res) => {
    

    const {
        userId,
        roomId,
        checkin_date,
        checkout_date,
        guest_number,
        price,
        totalPrice,
      } = req.body;
  
      //* test-ok
      if (!userId || !checkin_date || !checkout_date) {
        res.errorStatusCode = 400;
        throw new Error(
          "userId, checkin_date,checkout_date fields are required!"
        );
      }


      const reservationData = await Reservation.findOne({_id:req.params?.reservationId});
      if(!reservationData){
          res.errorStatusCode = 404;
          throw new Error('Reservation not found!')
      }


    
      //* test-ok
      //guest number validation check =>  
      if (guest_number || guest_number === 0 ) {
          //if guest number is entered! 
          if (guest_number > 5 || guest_number < 1) { 
          // checking with 1 - to 5,
          //because it should match with the rooms bedcount.
          res.errorStatusCode = 400;
          throw new Error("Invalid guest number! [1 to 5]");
        }
      } 
  
      
      const isCheckInBigger = new Date(checkin_date) >= new Date(checkout_date);
      const isValidDate = new Date(checkin_date) < new Date();
      // console.log("isCheckInBigger", isCheckInBigger);
      // console.log("isValidDate", isValidDate);
      // console.log('isCheckInBigger || isValidDate', isCheckInBigger || isValidDate)
      
      //* test-ok
      //checkin date cant be less or equal to checkout date 
      if (isCheckInBigger ) {
        res.errorStatusCode = 400;
        throw new Error("Invalid date - checkin date cant be less or equal to checkout date !");
      }
  
      //* test-ok
      //Checkin date can't be less than current day 
      if (isValidDate ) {
        res.errorStatusCode = 400;
        throw new Error("Checkin date can't be less than current day!");
      }
  
      //* test-ok
      //check if user is exist on users
      const user = await User.findOne({ _id: userId });
      if (!user) {
        res.errorStatusCode = 404;
        throw new Error("User not found on Users!");
      }
  
      //check if room is exist on rooms or if rrom is not entered then  assign a room if conditions are ok!
      let room;
      let rooms;
      let data;
  
      if (roomId) {
        //if room id is entered
        room = await Room.findOne({ _id: roomId });
        if (!room) {
          // if the room which user asked is not exist
          res.errorStatusCode = 404;
          throw new Error("Room is entered and it is not found on Rooms!");
        } 
          //if the room which user asked is exist!
          //CONDITIONS =>
          //1- guest
  
          //alternative to guestNumber check ->
  
          //* test-ok
          if (guest_number) {
            if (guest_number !== room.bedCount) {
              res.errorStatusCode = 400;
              throw new Error(
                "Selected room's bedCount and guestNumber are not matched!!"
              );
            }
          } else {
            if (room.bedCount !== 1) {
              res.errorStatusCode = 400;
              throw new Error(
                "Default guest number is 1 and selected room's bedcount is not 1!"
              );
            }
          }
  
          //2- date
          const avaliableDate = await Reservation.find({
            roomId,
            $nor: [
              { checkin_date: { $gt: req.body.checkout_date } },
              { checkout_date: { $lt: req.body.checkin_date } },
            ],
          });
          
          if (avaliableDate.length > 0) {
            res.errorStatusCode = 404;
            throw new Error(
              "Room not found on selected date and room!"
            );
          }
  
          // room entered version conditions are ok=>
          //then add the selected rooms price to the req body->
          req.body.price = room.price;
          //Anymore reservation will be created!
  
        
      } else {
        //if room id is not entered!
  
        //CONDITIONS=>
  
        //* test-ok
        //1- guest number check->
        if (guest_number) {
          // guest number should match with the bedcount of a room in rooms
          rooms = await Room.find({ bedCount: guest_number });
        } else {
          //when guest number is not entered, it is 1 as default, so i should search the rooms with 1 bed.
          rooms = await Room.find({ bedCount: 1 });
        }
      //   console.log('room=', room);
  
        //alternative to guestNumber check ->
        // room = await Room.findOne({ bedCount: guest_number || 1 });
  
        //* test-ok
        if (rooms.length < 1) {
          //if room couldnt be found with the guest number as bedcount
          res.errorStatusCode = 404;
          throw new Error("Room not found with has same bedCount with asked guest_number!");
        }
  
        //now we found the rooms we can select with the guestt_number
        //now i should make the date filterin in theese rooms->
  
        //checking the avaiable date=>
        //search the asked dates in reservation collection with date filter.
        // oldReservs.start > askedReserv.end
        // oldReservs.end < askedReserv.start
        //* test-ok
        const avaliableDate = await Reservation.find({
            _id: {$ne: req.params.reservationId}, //add the exception for the reservation which  will be updated!
          roomId: { $in: rooms.map(room=> room._id) } //make the filter between the rooms which have the correct bedCount number!
          ,
          $nor: [
            { checkin_date: { $gt: req.body.checkout_date } },
            { checkout_date: { $lt: req.body.checkin_date } },
          ],
        }); 
        console.log('avaliableDate = ', avaliableDate)
  
        if (avaliableDate?.length > 0) {
          res.errorStatusCode = 404;
          throw new Error("Room not found on asked date!");
        } else {
          //reser
          req.body.roomId = rooms[0]._id;
          req.body.price = rooms[0].price;
        }
      }




    data = await Reservation.updateOne(
        {_id:req.params.reservationId},
        req.body
        );


    res.status(202).send({
      error: false,
      message: "Reservation is updated!!",
      result: await Reservation.findOne({ _id: req.params.reservationId }),
    });

  },

  delete: async (req, res) => {
    const reservationData = await Reservation.findOne({
      _id: req.params?.reservationId,
    });
    if (!reservationData) {
      res.errorStatusCode = 404;
      throw new Error("Reservation not found!");
    }

    const data = await Reservation.deleteOne({ _id: req.params.reservationId });

    if (data.deletedCount < 1) {
      res.errorStatusCode = 500;
      throw new Error("Something went wrong !");
    }

    res.sendStatus(204);
  },
};
