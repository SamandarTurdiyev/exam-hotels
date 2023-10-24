import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    price : {
        type: Number,
        required: true,
    },
    maxPeople : {
        type: Number,
        required: true,
    },
    desc : {
        type: String,
        required: true
    },
    roomNumbers :[{number : Number , unavailableDates: {type :[Date]} }],
    } ,
    {
        timestamps: true
    })

    // [
    //     {number: 101 , unavailableDates: [01.05.2023, 02.05.2023]}
    //     {number: 102 , unavailableDates: [01.05.2023, 02.05.2023]}
    //     {number: 103 , unavailableDates: [01.05.2023, 02.05.2023]}
    //     {number: 104 , unavailableDates: [01.05.2023, 02.05.2023]}
    //     {number: 105 , unavailableDates: [01.05.2023, 02.05.2023]}
    // ]
export default mongoose.model("Room", RoomSchema)