const axios =
require("axios");

async function getToken(){

const auth =
Buffer
.from(

`${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`

)
.toString(
"base64"
);

const res =
await axios.get(

"https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",

{
headers:{
Authorization:
`Basic ${auth}`
}
}

);

return res
.data
.access_token;

}

async function stkPush({

phone,
amount,
eventId

}){

const token =
await getToken();

const timestamp =
new Date()

.toISOString()

.replace(
/\D/g,
""
)

.slice(
0,
14
);

const password =
Buffer
.from(

process.env
.SHORTCODE +

process.env
.PASSKEY +

timestamp

)

.toString(
"base64"
);

const res =
await axios.post(

"https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",

{

BusinessShortCode:
process.env.SHORTCODE,

Password:
password,

Timestamp:
timestamp,

TransactionType:
"CustomerPayBillOnline",

Amount:
amount,

PartyA:
phone,

PartyB:
process.env.SHORTCODE,

PhoneNumber:
phone,

CallBackURL:
process.env.CALLBACK_URL,

AccountReference:
eventId,

TransactionDesc:
"Event Ticket"

},

{

headers:{

Authorization:
`Bearer ${token}`

}

}

);

return res.data;

}

module.exports = {
stkPush
};
