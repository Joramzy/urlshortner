const mongoose=require("mongoose");
const { string } = require("zod");
const schema=new mongoose.Schema({
    longUrl:{
        type:String,
        required:true
    },
    shortUrl:{
        type:String,
        required:true
    }
});
const shortUrlModel=mongoose.model("shortUrl",schema);
module.exports=shortUrlModel;

//fields/collections to be saved in the database 
