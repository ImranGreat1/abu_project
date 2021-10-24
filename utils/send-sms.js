require('dotenv').config({ path: './config.env' });

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const sendSMS = (smsData) => {
  client.messages
    .create({
      body: smsData.body,
      from: process.env.TWILIO_NUMBER,
      to: smsData.number,
    })
    .then((message) => console.log(message));
};

module.exports = sendSMS;
