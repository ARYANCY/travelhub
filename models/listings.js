const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review');

const listingSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    description : String,
    image:{
        filename:String,
        url:{
            type: String,
            set: (v)=>v===""? "https://www.shutterstock.com/image-vector/home-illustration-simple-house-isolated-260nw-2540084969.jpg":v,
        }
    },
    price:Number,
    location:String,
    country:String,
    Reviews:[{
        type: Schema.Types.ObjectId,
        ref:"Review"
    }],
    Mapcoordinates:{
        latitude: {
            type: Number,
            required: true,
        },
        longitude: {
            type: Number,
            required: true,
        },
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref:"User"
    },
});

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in: listing.Reviews}});
    }
})

const Listing= mongoose.model('Listing',listingSchema);
module.exports= Listing;