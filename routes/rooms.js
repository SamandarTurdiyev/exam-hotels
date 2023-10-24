import {Router} from "express"
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom, updateRoomAvailability } from "../controllers/room.js"
import { VerifyAdmin } from "../utils/verifyToken.js"

const router = Router()
// create
router.post('/:hotelid', VerifyAdmin  , createRoom) 
// update
router.put('/:id',VerifyAdmin , updateRoom) 
router.put('/availability/:id' , updateRoomAvailability) 
// delete
router.delete('/:id/:hotelid',VerifyAdmin , deleteRoom) 
// get
router.get('/:id'  , getRoom) 
// get all  
router.get('/' , getRooms) 
export default router