const axios = require("axios");

async function initiatePayment({
  phone,
  amount,
  email,
  eventId
}) {
  try {
    const response = await axios.post(
      "https://api.megapay.co.ke/stkpush", // (example endpoint - confirm from your dashboard)
      {
        phone,
        amount,
        email,
        reference: eventId,
        callback_url: process.env.MEGAPAY_CALLBACK_URL
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.MEGAPAY_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    return response.data;

  } catch (error) {
    console.log(error.response?.data || error.message);
    throw new Error("MegaPay STK push failed");
  }
}

module.exports = {
  initiatePayment
};
