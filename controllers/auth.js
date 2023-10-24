import User from "../models/user.js"
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js"
import  jwt  from "jsonwebtoken"
export const register = async(req ,res, next) => {
    const {username ,email , password } = req.body
    try {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password , salt)
        const newUser = new User({
            
            ...req.body ,
            password : hash
        })
        await newUser.save()
      res.status(200).json({status: 200 , msg : "User has been created."})
    } catch (error) {
       next(error) 
    }
}
export const login = async(req ,res, next) => {
    const {username  } = req.body
    try {
      const user =await User.findOne({username})

      if (!user) return next(createError(404 , "User not found"))

      const isPasswordCorrect= await bcrypt.compare(req.body.password , user.password)
      if (!isPasswordCorrect) return next(createError(400 , "Wron password or username"))

      const token  = jwt.sign({id: user._id , isAdmin: user.isAdmin} , process.env.JWT)

      const {password , isAdmin , ...otherDetails} = user._doc
      res.cookie("access_token" , token , {
        httpOnly :true
      }).status(200).json({status: 200 , details:{...otherDetails } , isAdmin})
    } catch (error) {
       next(error) 
    }
}
