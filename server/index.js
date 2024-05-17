import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { ServerApiVersion } from 'mongodb';
import UserModel from './Models/Users.js'
import bcrypt from "bcrypt";
import ServiceModel from './Models/Service.js';
import RegisteredModel from './Models/Registered.js';


let app=express();

app.use(cors());
app.use(express.json());

app.post("/login",async(req,res)=>{
    try
    {
        const {rusername,rpassword}=req.body;
        const User=await UserModel.findOne({username:rusername});
        if(!User)
        {
            return res.status(500).json({msg:"User not found.."})
        }
        else
        {
            const passwordMatch=await bcrypt.compare(rpassword,User.password)
            if(passwordMatch)
                return res.status(200).json({User,msg:"Success.."})
            else
                return res.status(401).json({msg:"Authentication Failed.."})
        }
    }
   catch(error)
   {
        res.status(500).json({msg:error.message});
   }
});


// Registration route
app.post("/registerUser", async (req, res) => {
    try {
        const {rusername,remail,rpassword,rpic,risAdmin,rdate}=req.body;

        const hashPassword=await bcrypt.hash(rpassword,10);
        // // Basic input validation
        // if (!remail || !rpassword) {
        //     return res.status(400).json({ msg: "Email and password are required" });
        // }


        // Check if the user already exists
        const existingUser = await UserModel.findOne({ email:remail });
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists" });
        }
       
        const newUser = new UserModel({ 
            username:rusername,
            email:remail,
            password:hashPassword,
            pic:rpic,
            isAdmin:risAdmin, 
            date:rdate, 
        });
        await newUser.save();
        return res.status(201).json({ newUser, msg: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});



// register a services

app.post("/registerService", async (req, res) => {
    try {
        const {rcategory,rname,rdescription,rprice,rpic}=req.body;

       
       
        const newService = new ServiceModel({ 
            category:rcategory,
            name:rname,
            desc:rdescription,
            price:rprice,
            pic:rpic, 
      
        });
        await newService.save();
        return res.status(201).json({ newService, msg: "Service registered successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

// Get all registered services
app.get("/getService", async (req, res) => {
    try {
        const services = await ServiceModel.find();
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});


app.delete("/delService/:pid", async (req, res) => {
    try {
      const serviceid=req.params.pid;
      await ServiceModel.findOneAndDelete({_id:serviceid});
  
      
    } 
    catch (error) {
      res.status(500).json({ error: "An error occurred" });
    }
  });


  app.post("/updatService", async (req, res) => {
    try {
      const cid = req.body.serviceid;
      const {rcategory,rname,rdescription,rprice,rpic}=req.body;




      const service = await ServiceModel.findOne({ _id: cid });
      service.category = rcategory;
      service.name = rname;
      service.desc = rdescription;
      service.price = rprice;
      service.pic = rpic;
      await service.save();
      res.send({ service: service, msg: "Updated." });
    } catch (error) {
      res.status(500).json({ error: "An error occurred" });
    }
  });


  app.post("/updatProfile", async (req, res) => {
    try {
      const cid = req.body.profileid;
      const {rusername,remail,rpassword,rpic}=req.body;

     


      const user = await UserModel.findOne({ _id: cid });
      user.username = rusername;
      user.email = remail;
      user.password = rpassword;
      user.pic = rpic;
    
      await user.save();
      res.send({ user: user, msg: "Updated." });
    } catch (error) {
      res.status(500).json({ error: "An error occurred" });
    }
  });


//########################################################################################

//RegisteredModel

//Register a profile

  app.post("/RegisterProfile", async (req, res) => {
    try {
        const {rpackage,rname,risActive,rcategory,rprice,rpic,userid}=req.body;

       
        const newProfile = new RegisteredModel({ 
            package:rpackage,
            name:rname,
            isActive:risActive,
            category:rcategory,
            price:rprice, 
            pic:rpic, 
            userid:userid
        });
        await newProfile.save();
        return res.status(201).json({ newProfile, msg: "Profile registered successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});


// Get all registered Profiles
app.get("/getProfile", async (req, res) => {
    try {
        const profiles = await RegisteredModel.find();
        res.status(200).json(profiles);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});



app.post("/updateIsActive", async (req, res) => {
    try {
      const cid = req.body.profileid;
      const {risActive}=req.body;

     


      const profiles = await RegisteredModel.findOne({ _id: cid });
      profiles.isActive = risActive;

    
      await profiles.save();
      res.send({ profiles: profiles, msg: "Updated." });
    } catch (error) {
      res.status(500).json({ error: "An error occurred" });
    }
  });





var conn="mongodb+srv://admin:admin@project.ludeoui.mongodb.net/HelpingHandsDB?retryWrites=true&w=majority&appName=Project";

mongoose.connect(conn);

app.listen(3002,()=>{
    console.log("Server Connected..");
})


