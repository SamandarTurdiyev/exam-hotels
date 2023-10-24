import User from "../models/user.js"

export const updateUser = async (req , res ,next ) => {
    const {id} = req.params
    try {
        const updatedUser = await User.findByIdAndUpdate(id , {$set : req.body} , {new: true})
        res.status(201).json({status :201 , data : updatedUser ,  msg : "updated."})
    } catch (error) {
        next(error)
    }
}


export const deleteUser = async (req , res ,next ) => {
    const {id} = req.params
    try {
       await User.findByIdAndDelete(id)
        res.status(200).json({status: 200 , data : null ,  msg : "deleted."})
    } catch (error) {
        next(error)
    }
}

export const getUser = async (req , res ,next ) => {
    const {id} = req.params
    try {
        const user = await User.findById(id)
        // console.log(User);
        res.status(200).json({status : 200 , data : user ,  msg : "get one User." })

    } catch (error) {
        next(error)
    }
}
export const getUsers = async (req , res ,next ) => {
   
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
}