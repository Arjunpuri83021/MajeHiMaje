const mongoose=require('mongoose')

const mongoSchema=mongoose.Schema({
    imageUrl:String,
    name:String,
    titel:String,
    videoNo:String,
    views:Number,
    link:String,
    minutes:String,
    Category:String
})


module.exports = mongoose.model('postData',mongoSchema)