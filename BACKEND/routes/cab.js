//const router = require("express").Router();
//let Cab = require("../models/Cab");

const express = require('express');
const router = express.Router();
const Cab = require('../models/Cab');


router.route("/add").post((req,res)=>{

    const packageName = req.body.packageName;
    const description = req.body.description;
    const price = Number(req.body.price);
   // const startDate = req.body.startDate;
   // const endDate = req.body.endDate;
    const timePeriod = req.body.timePeriod;
    const role = req.body.role;
    const newCab = new Cab({
        packageName,
        description,
        price,
       // startDate,
       // endDate,
        timePeriod,
        role


    })

    newCab.save().then(()=>{
        res.json("Student Added")
    }).catch((err)=>{
        console.log(err);
    })

})

router.route("/").get((req,res)=>{
    Cab.find().then((cab)=>{
        res.json(cab)
    }).catch((err)=>{
        console.log(err)
    })

})

router.route("/update/:id").put(async(req,res)=>{
    let userId = req.params.id;
    const{packageName,description,price,timePeriod,role} = req.body;

    const updateCab ={
        packageName,
        description,
        price,
      //  startDate,
       // endDate,
        timePeriod,
        role

    }
await Cab.findByIdAndUpdate(userId,updateCab)
    .then(()=>{
        res.status(200).send({status :"User updated"})
}).catch((err) =>{
        console.log(err);
        res.status(500).send({status: "Error with updating data"});

    })

    
})

router.route("/delete/:id",).delete(async(req,res)=>{
    let userId = req.params.id;

    await Cab.findByIdAndDelete(userId)
    .then(()=>{
        res.status(200).send({status: "User deleted"});

    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({staus: "Error with delete user", error: err.message});
    })

    
})

    router.route("/get/:id",).get(async(req,res)=>{
        let userId = req.params.id;
        const user= await Cab.findById(userId)
        .then((cab)=>{
            res.status(200).send({status: "User fetched", cab})
        }).catch((err)=> {
            console.log(err.message);
            res.status(500).send({status: "Error with get user", error: err.message});
    })
    })

    router.route("/update/select/:id").put(async(req,res)=>{
        let userId = req.params.id;
        const { userCount } = req.body;
    
        await Cab.findByIdAndUpdate(userId, { userCount })
            .then(() => {
                res.status(200).send({ status: "User count updated" });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send({ status: "Error with updating user count" });
            });
    });
    

    
// POST route to handle package selection
// Backend route
router.post('/select', async (req, res) => {
    const { packageName } = req.body;

    try {
        // Find the cab with the selected package name
        const cab = await Cab.findOne({ packageName });

        if (!cab) {
            return res.status(404).json({ message: "Cab package not found" });
        }

        // Increment the count of users for the selected package
        cab.userCount += 1;

        // Save the updated cab
        await cab.save();

        res.status(200).json({ message: "Package selected successfully" });
    } catch (error) {
        console.error('Error selecting package:', error);
        res.status(500).json({ message: "Internal server error" });
    }
});








module.exports =router;