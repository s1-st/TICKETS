const mongoose =
require("mongoose");

const PaymentSchema =
new mongoose.Schema({

email:String,

phone:String,

amount:Number,

eventId:String,

checkoutId:String,

status:{
type:String,
default:"pending"
},

createdAt:{
type:Date,
default:Date.now
}

});

module.exports =
mongoose.model(
"Payment",
PaymentSchema
);
