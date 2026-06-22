const express =
require("express");

const Payment =
require("../models/Payment");

const Ticket =
require("../models/Ticket");

const Event =
require("../models/Event");

const { v4: uuid } =
require("uuid");

const QRCode =
require("qrcode");

const { stkPush } =
require("../utils/mpesa");

const router =
express.Router();

/* =====================
START PAYMENT
===================== */

router.post(
"/pay",

async(req,res)=>{

try{

const {

email,
phone,
eventId

}
=
req.body;

const event =
await Event
.findById(
eventId
);

if(
!event
){

return res
.status(404)
.json({

message:
"Event not found"

});

}

const pay =
await stkPush({

phone,

amount:
event.price,

eventId

});

await Payment
.create({

email,

phone,

amount:
event.price,

eventId,

checkoutId:
pay
.CheckoutRequestID

});

res.json({

success:true,

message:
"Check M-Pesa",

checkout:
pay
.CheckoutRequestID

});

}catch(e){

res
.status(500)
.json({

error:
e.message

});

}

}
);

/* =====================
CALLBACK
===================== */

router.post(
"/callback",

async(req,res)=>{

try{

const data =
req.body;

const callback =

data
.Body
.stkCallback;

if(
callback
.ResultCode === 0
){

const checkout =

callback
.CheckoutRequestID;

const payment =

await Payment
.findOne({

checkoutId:
checkout

});

if(
payment
){

const qr =

await QRCode
.toDataURL(

uuid()

);

const {
sendTicketEmail
}
=
require(
"../utils/mail"
);

const ticketCode =
uuid();

await Ticket
.create({

email:
payment.email,

eventId:
payment.eventId,

ticketCode,

qr

});

await sendTicketEmail({

email:
payment.email,

ticketCode,

qr

});

payment.status =
"paid";

await payment.save();

}

}

res.sendStatus(
200
);

}catch{

res.sendStatus(
500
);

}

}
);

module.exports =
router;
