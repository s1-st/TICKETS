const mongoose =
require("mongoose");

const EventSchema =
new mongoose.Schema({

title:{
type:String,
required:true
},

description:{
type:String,
required:true
},

date:{
type:String,
required:true
},

location:{
type:String,
required:true
},

price:{
type:Number,
required:true
},

totalSeats:{
type:Number,
required:true
},

availableSeats:{
type:Number,
required:true
},

image:{
type:String,
default:""
},

createdAt:{
type:Date,
default:Date.now
}

});

module.exports =
mongoose.model(
"Event",
EventSchema
);
