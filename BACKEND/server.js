const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const uploadRoute = require("./routes/uploadRoute.js")
require("dotenv").config();
//======================================
const dateRouter = require('./routes/dateRouter.js');
const packageLoginRouter=require('./routes/PackageloginRouter.js')



const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());
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

const connection = mongoose.connection;

connection.once("open", () => {

    console.log("Mongodb Connection Success!");
})

const cabRouter = require("./routes/cab.js");


app.use("/cab",cabRouter);
app.use("/uploads", uploadRoute);
app.use("/packagelogin",packageLoginRouter);

app.listen(PORT, () => {

    console.log(`Server is up and running on port number : ${PORT}`)
})


