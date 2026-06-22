const express =
require("express");

const Event =
require("../models/Event");

const router =
express.Router();

/* =====================
CREATE EVENT
===================== */

router.post(
"/create",

async(req,res)=>{

try{

const {

title,
description,
date,
location,
price,
totalSeats,
image

}
=
req.body;

if(
!title ||
!description ||
!date ||
!location ||
!price ||
!totalSeats
){

return res
.status(400)
.json({

success:false,

message:
"Missing fields"

});

}

const event =
await Event
.create({

title,

description,

date,

location,

price,

totalSeats,

availableSeats:
totalSeats,

image

});

res.json({

success:true,

event

});

}catch(e){

res
.status(500)
.json({

success:false,

error:
e.message

});

}

}
);

/* =====================
GET ALL EVENTS
===================== */

router.get(
"/",

async(req,res)=>{

try{

const events =

await Event
.find()

.sort({

createdAt:-1

});

res.json({

success:true,

count:
events.length,

events

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
GET ONE EVENT
===================== */

router.get(
"/:id",

async(req,res)=>{

try{

const event =

await Event
.findById(

req
.params
.id

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

res.json({

success:true,

event

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
UPDATE EVENT
===================== */

router.put(
"/:id",

async(req,res)=>{

try{

const event =

await Event
.findByIdAndUpdate(

req.params.id,

req.body,

{

new:true

}

);

res.json({

success:true,

event

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
DELETE EVENT
===================== */

router.delete(
"/:id",

async(req,res)=>{

try{

await Event
.findByIdAndDelete(

req.params.id

);

res.json({

success:true,

message:
"Deleted"

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

module.exports =
router;
