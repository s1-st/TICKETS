const express =
require(
"express"
);

const Ticket =
require(
"../models/Ticket"
);

const router =
express
.Router();

/* ====================
MY TICKETS
==================== */

router.get(

"/:email",

async(
req,
res
)=>{

try{

const tickets =

await Ticket
.find({

email:

req
.params
.email

})

.sort({

createdAt:
-1

});

res.json({

success:true,

tickets

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

/* ====================
VERIFY TICKET
==================== */

router.post(

"/verify",

async(
req,
res
)=>{

try{

const {

ticketCode

}
=
req.body;

const ticket =

await Ticket
.findOne({

ticketCode

});

if(
!ticket
){

return res
.status(404)
.json({

valid:false

});

}

res.json({

valid:true,

ticket

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
