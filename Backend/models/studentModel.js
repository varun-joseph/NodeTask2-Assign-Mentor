import mongoose from "mongoose";

// creating schmema for users collection in userlist DB 

const studentschema= new mongoose.Schema({

    name:{type:String,required:true},
    mentorname:{type:String}
})

export const Student = mongoose.model("student",studentschema);