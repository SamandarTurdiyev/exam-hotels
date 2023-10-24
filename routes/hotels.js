import {Router} from "express"
import Hotel from "../models/hotel.js"
// import { createError } from "../utils/error.js"
import { countByCity, countByType, createHotel, deleteHotel, getHotel, getHotelRooms, getHotels, updateHotel } from "../controllers/hotel.js"
import { VerifyAdmin } from "../utils/verifyToken.js"
import { upload } from "../multer/multer.js"
const router = Router()

// create
router.post('/',upload.single("img") ,  VerifyAdmin  , createHotel) 
// update
router.put('/:id',VerifyAdmin , updateHotel) 
// delete
router.delete('/:id',VerifyAdmin , deleteHotel) 
// get
router.get('/find/:id'  , getHotel) 
// get all  
router.get('/' , getHotels) 
router.get('/countByCity' , countByCity) 
router.get('/countByType' , countByType) 
router.get('/room/:id' , getHotelRooms) 

export default router