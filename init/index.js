const mongoose = require('mongoose');
const Listing =  require('../models/listings');
const Data = require('./data');
main().then(()=>{
    console.log("mongoose connected");
}).catch((err)=>{
    console.log("error",err);
})

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/airbnb");
}

const initDB= async()=>{
    await Listing.deleteMany({});
    Data.data = Data.data.map((obj)=>({
        ...obj
        ,owner:"689dc205dd62066d8d1afbbb"}))
    await Listing.insertMany(Data.data);
    console.log("DATA INSERTED SUCCESSFULLY")
}
initDB();