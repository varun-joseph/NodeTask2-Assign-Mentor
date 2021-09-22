import mongoose from "mongoose";

const mentorschema= new mongoose.Schema({

    name:{type:String,required:true},
    students:{type:Array},
})

export const Mentor = mongoose.model("mentor",mentorschema);