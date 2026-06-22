const axios = require("axios");

async function initiatePayment({
phone,
amount,
email,
eventId
}) {

try {

const response =
await axios.post(

"https://megapay.co.ke/backend/v1/initiatestk",

{
api_key:
process.env.MEGAPAY_API_KEY,

email:
process.env.MEGAPAY_EMAIL,

amount,

msisdn:
phone,

reference:
eventId
}

);

return response.data;

}
catch(error){

console.log(
error.response?.data
);

throw new Error(
"MegaPay STK push failed"
);

}

}

module.exports = {
initiatePayment
};
