require("dotenv").config();

const express =
require("express");

const mongoose =
require("mongoose");

const cors =
require("cors");

const app =
express();

/* ROUTES */

const authRoutes =
require("./routes/auth");

const eventRoutes =
require("./routes/events");

const paymentRoutes =
require("./routes/payments");

const ticketRoutes =
require("./routes/tickets");

/* MIDDLEWARE */

app.use(cors());

app.use(express.json());

app.use(
express.urlencoded({
extended:true
})
);

/* CONNECT DB */

mongoose
.connect(
process.env.MONGO_URL
)

.then(()=>{

console.log(
"MongoDB Connected"
);

})

.catch(err=>{

console.log(
err
);

});

/* HOME */

app.get(
"/",

(req,res)=>{

res.json({

success:true,

message:
"Event Ticket Backend Running"

});

}
);

/* ROUTES */

app.use(
"/auth",
authRoutes
);

app.use(
"/events",
eventRoutes
);

app.use(
"/payments",
paymentRoutes
);

app.use(
"/tickets",
ticketRoutes
);

/* START */

const PORT =
process.env.PORT ||
3000;

app.listen(
PORT,

()=>{

console.log(
`Server running on ${PORT}`
);

}
);
