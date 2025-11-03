import mongoose, { Schema } from "mongoose";
import { unique } from "next/dist/build/utils";

const userSchema=new Schema({
    name:{
        type:String
    },
    CollegeId:{
        type:String,
        unique:true
    },
    Password:{
        type:String
    },
    Role:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    Branch:{
        type:String
    },
    course:{
        type:String
    }
})


const User=mongoose.models.user || mongoose.model("user",userSchema)
export default User