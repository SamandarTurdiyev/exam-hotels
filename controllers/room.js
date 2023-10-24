import Room from "../models/room.js";
import Hotel from "../models/hotel.js";
import { createError } from "../utils/error.js";

export const createRoom = async (req ,res, next) => {
    const hotelId = req.params.hotelid
    const newRoom = new Room(req.body)
    console.log(newRoom);
    try {
      const savedRoom = await newRoom.save()
      try {
        await Hotel.findByIdAndUpdate(hotelId , {$push : {rooms: savedRoom._id}})
        res.status(200).json({status:200 , room : savedRoom , msg : "created"})
      } catch (err) {
        next(err)
      }
      res.status(200).json({status:200 , room : savedRoom , msg : "created"})

    } catch (err) {
        next(err)
    }
}



export const updateRoom = async (req , res ,next ) => {
    const {id} = req.params
    try {
        const updatedRoom = await Room.findByIdAndUpdate(id , {$set : req.body} , {new: true})
        res.status(201).json({status :201 , data : updatedRoom ,  msg : "updated."})
    } catch (error) {
        next(error)
    }
}
export const updateRoomAvailability = async (req , res ,next ) => {
   try {
        await Room.updateOne({"roomNumbers._id" : req.params.id} , {
            $push : {
                "roomNumbers.$.unavailableDates" : req.body
            }
        })
   } catch (error) {
    
   }
}
export const deleteRoom = async (req , res ,next ) => {
    const hotelId = req.params.hotelid
    const {id} = req.params
    try {
       await Room.findByIdAndDelete(id)
       try {
        await Hotel.findByIdAndUpdate(hotelId , {$pull : {rooms: req.params.id}})
        res.status(200).json({status:200 , room : null , msg : "Room has been deleted"})
      } catch (err) {
        next(err)
      }
    } catch (error) {
        next(error)
    }
}

export const getRoom = async (req , res ,next ) => {
    const {id} = req.params
    try {
        const room = await Room.findById(id)
        res.status(200).json({status : 200 , data : room ,  msg : "get one hotel." })

    } catch (error) {
        next(error)
    }
}
export const getRooms = async (req , res ,next ) => {
   
    try {
        const rooms= await Room.find()
        res.status(200).json(rooms)
    } catch (error) {
        next(error)
    }
}