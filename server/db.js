const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/amazon?readPreference=primary&appname=MongoDB%20Compass&ssl=false"
// const mongoURI = "mongodb+srv://memyself:125211982662777@inotebook.90qr1.mongodb.net/iNotebook?retryWrites=true&w=majority"

const connectToMongo = ()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connected to Database")
    })
}

module.exports = connectToMongo;