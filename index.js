import express from "express"
import dotenv from "dotenv"
dotenv.config()

import mongoose from "mongoose"
import AuthRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
import cookieParser from "cookie-parser"
import cors from "cors"
const app = express()

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("connected to mongodb");
      } catch (error) {
        throw error
      }
}
mongoose.connection.on("disconnected" , () => {
  console.log("mongoDb disconnected!");
})

// middlewers
app.use(cors())
app.use(cookieParser())
app.use(express.json())


app.use('/api/auth' ,AuthRoute)
app.use('/api/users' , usersRoute)
app.use('/api/hotels' , hotelsRoute)
app.use('/api/rooms' , roomsRoute)

app.use((err , req , res , next) => {
  const errorStatus = err.status || 500
  const errorMessage= err.message || "Something went wrong!"

    return res.status(errorStatus).json({ succes : false ,status: errorStatus  , msg:errorMessage , stack : err.stack})
})


app.listen(8800 , () => {
    connect()
    console.log("connected to backend.")
})