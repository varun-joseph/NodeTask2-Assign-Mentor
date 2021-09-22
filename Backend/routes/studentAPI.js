
import express from "express";

import {Student} from "../models/studentModel.js";

const srouter =express.Router();

// READ all students

srouter.get("/",async(req,res)=>{

    const Allstudents = await Student.find();
    console.log("All students >>>",Allstudents);
    res.send(Allstudents);
})

// CREATE student

srouter.post("/addstudent",async(req,res)=>{

    const addstudent=req.body ;
    console.log("new student entry >>>",addstudent);
  
    const student=new Student(addstudent)
 
  try{
    const newstudent =await student.save();
    console.log("new student added !!!")
    res.send(newstudent);
  }
  catch(err){
     res.status(500);
     res.send(err);
  }
  
  })

// Change or Assign mentor for a student (update -PATCH)

srouter.patch('/mentorupdate/:name', (req, res) => {
    Student.findOneAndUpdate(
      {name:req.params.name},
      {mentorname :req.body.mentorname},
    {new: true}
        )
    
    .then((s) => {
        if (!s) {
            return res.status(404).send();
        }
        else{
            res.send(s);
            console.log("mentor changed for student!!!",s);
        }
        
    }).catch((error) => {
        res.status(500).send(error);
        console.log("error in changing  mentor !!!")
    })
})


export default srouter;