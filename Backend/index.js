import express, { response } from "express";

import mongoose from "mongoose";
import cors from "cors";

import mrouter from "./routes/mentorAPI.js";

import srouter from "./routes/studentAPI.js";

const PORT = process.env.PORT || 5000;

const app=express();

app.use(express.json());
app.use(cors());
// testing
app.get("/",(req,res)=>{res.send(">>>>>Mentor - Student portal welcomes you<<<")});

app.listen(PORT,console.log("server started"));


// const url="mongodb+srv://SabarishE:sabarishe@cluster0.eeimf.mongodb.net/msportal"


const url= process.env.MONGODB_URI || "mongodb://localhost/msportal";

mongoose.connect(url,{useNewUrlParser:true});

const con=mongoose.connection;

con.on("open",()=>console.log("MongoDB in connected"));




app.use("/mentors",mrouter);
app.use("/students",srouter);

  

