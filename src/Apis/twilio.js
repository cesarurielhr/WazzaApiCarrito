require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

module.exports = {
    sendWhatsappMessage: (phone, message) => {
        client.messages
        .create({
            body: 'Tu compra ha sido realizada con exito',
            from: 'whatsapp:+14155238886',
            to: 'whatsapp:+5213241029185'
        })
        .then(message => console.log(message.sid));
    },
    sendWhatsappMessageRegister: (phone, message) => {
        client.messages
        .create({
            body: 'Haz registrado tu cuenta con exito',
            from: 'whatsapp:+14155238886',
            to: 'whatsapp:+5213241029185'
        })
        .then(message => console.log(message.sid));
    }
}