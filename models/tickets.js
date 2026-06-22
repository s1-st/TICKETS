const mongoose =
require("mongoose");

const TicketSchema =
new mongoose.Schema({

email:{
type:String
},

eventId:{
type:String
},

ticketCode:{
type:String
},

qr:{
type:String
},

paid:{
type:Boolean,
default:true
},

createdAt:{
type:Date,
default:Date.now
}

});

module.exports =
mongoose.model(
"Ticket",
TicketSchema
);
