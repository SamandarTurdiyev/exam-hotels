import Hotel from "../models/hotel.js"
import Room from "../models/room.js"
import { upload } from "../multer/multer.js"
export const createHotel = async (req , res ,next ) => {
    upload.single("img") 
    const newHotel =new Hotel(req.body)
    const {filename} = req.file
    // console.log(filename);
    try {        
        const savedHotel = await newHotel.save()
        savedHotel.photos = [filename];
        await savedHotel.save()
        res.status(200).json({status: 200 , data : savedHotel , msg : "created."})
    } catch (error) {
        next(error)
    }
}

export const updateHotel = async (req , res ,next ) => {
    const {id} = req.params
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(id , {$set : req.body} , {new: true})
        res.status(201).json({status :201 , data : updatedHotel ,  msg : "updated."})
    } catch (error) {
        next(error)
    }
}

export const deleteHotel = async (req , res ,next ) => {
    const {id} = req.params
    try {
       await Hotel.findByIdAndDelete(id)
        res.status(200).json({status: 200 , data : null ,  msg : "deleted."})
    } catch (error) {
        next(error)
    }
}

export const getHotel = async (req , res ,next ) => {
    const {id} = req.params
    try {
        const hotel = await Hotel.findById(id)
        res.status(200).json({status : 200 , data : hotel ,  msg : "get one hotel." })
    } catch (error) {
        next(error)
    }
}
export const getHotels = async (req , res ,next ) => {
    const {min , max , ...others } = req.query
    try {
        const hotels = await Hotel.find({...others , cheapestPrice: {$gt : min | 1, $lt: max ||999}}).limit(req.query.limit)
        res.status(200).json(hotels)
    } catch (error) {
        next(error)
    }
}

export const countByCity = async (req , res ,next ) => {
    const cities = req.query.cities.split(",")
    try {
        const list = await Promise.all(cities.map( city => {
            return Hotel.countDocuments({city : city})
        }) )
        res.status(200).json({status : 200 , data : list ,msg : "get all hotels." })
    } catch (error) {
        next(error)
    }
}

export const    countByType = async (req , res ,next ) => {
    try {
        const hotelCount =await Hotel.countDocuments({type: "hotel"})
        const apartmentCount =await Hotel.countDocuments({type: "apartment"})
        const resortCount =await Hotel.countDocuments({type: "resort"})
        const villaCount =await Hotel.countDocuments({type: "villa"})
        const cabinCount =await Hotel.countDocuments({type: "cabin"})
        
        res.status(200).json([
            {type: "hotel" , count: hotelCount},
            {type: "apartment" , count: apartmentCount },
            {type: "resort",count : resortCount },
            {type: "villa" ,count :  villaCount},
            {type: "cabins" ,count :  cabinCount}
        ])
    } catch (error) {
        next(error)
    }
}


export const getHotelRooms= async (req, res, next ) =>{
    try {
        const hotel =await Hotel.findById(req.params.id)
        const list =await Promise.all(hotel.rooms.map((room) => {
            return Room.findById(room)
        }))
        res.status(200).json({status: 200 , data: list , msg: "get hotel rooms"} )
    } catch (err) {
        next(err)
    }
}