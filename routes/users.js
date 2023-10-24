import {Router} from "express"
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user.js"
import { VerifyAdmin, VerifyUser, verifyToken } from "../utils/verifyToken.js"

const router = Router()
// router.get('/checkauthentication' , verifyToken , (req, res ,next) => {
//     res.send("hello user , you are logged in")
// })

// router.get('/checkuser/:id' , VerifyUser , (req, res ,next) => {
//     res.send("hello user , you are logged in and you can delete you account")
// })

// router.get('/checkadmin/:id' , VerifyAdmin , (req, res ,next) => {
//     res.send("hello admin , you are logged in and you can delete all accounts ")
// })
// update
router.put('/:id' ,VerifyUser , updateUser) 
// delete
router.delete('/:id',VerifyUser , deleteUser) 
// get
router.get('/:id' ,VerifyUser , getUser) 
// get all  
router.get('/' ,VerifyAdmin, getUsers) 
export default router