const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();
const multer = require("multer");
//import file system.
const fs = require('fs');
const path = require("path");

const userRoutes = require("./routes/userRoutes");

app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
app.use(express.json());
const uploadRoute = require("./routes/uploadRoute.js")

//======================================
const dateRouter = require('./routes/dateRouter.js');


const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());
app.use("/api/v1/user", userRoutes);
app.use("/uploads", express.static("uploads"));

//================================
app.use('/dates', dateRouter);

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {

    //useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
    //useFindAndModify: false
});

//multer has option called disk storage.2 parameters --> destination and file name.
//First we save the images in the computer, and then move it to MongoDB
const storage = multer.diskStorage({

    //creates a folder called uploads and stores the files in it.
     destination:(req,file,cb)=>{
     //cb is the callback.
     cb(null,'uploads')
     },
     filename:(req,file,cb) => {
         //since we could receive multiple files, we are going to store it with the original name.
         cb(null,file.originalname);
     },
 });
 
 //Specify the storage as multer storage.
 const upload = multer({
    //Specify the storage as our "Storage" that we created.
    storage:storage,
 //since we are uploading files one by one, we have to make use of "single".
 //we are going to upload images using this name (testImage).
 //since we are uploading files one by one, should make use of "single"
    limits: {
        fileSize: 10 * 1024 * 1024, // 10 MB
    },
 });

const connection = mongoose.connection;

connection.once("open", () => {

    console.log("Mongodb Connection Success!");
})

const inquiryRouter = require("./routes/inquiries.js");

http://localhost:8070/inquiry

app.use("/inquiry",inquiryRouter);
const paymentdetailsRouter = require("./routes/paymentdetails");
app.use("/paymentdetails",paymentdetailsRouter);

const reportsRouter = require("./routes/reports");
app.use("/reports", reportsRouter);

const tripRouter = require("./routes/trips.js");
app.use("/trip",tripRouter);

const driverpaymentsRouter = require("./routes/driverpayments");
app.use("/driverpayments", driverpaymentsRouter);
const advertisementRouter = require("./routes/advertisements.js")(upload); // Pass upload to advertisements router
app.use("/advertisement", advertisementRouter);

// Serve uploaded images statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const CustomerRouter =require("./routes/Customers.js") 
app.use("/Customer",CustomerRouter)

const cabRouter = require("./routes/cab.js");


app.use("/cab",cabRouter);
app.use("/uploads", uploadRoute);

app.listen(PORT, () => {

    console.log(`Server is up and running on port number : ${PORT}`)
})



