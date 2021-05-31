const sms_router = require('express').Router()
const accountSid = 'AC59f76b621ec2152659ce42a54b7b10ce';
const authToken = '82240dfe5fed7feca0928785de08e44e';
const client = require('twilio')(accountSid, authToken);


// sms_router.get('/',(req,res)=>{})

function verifyPhoneNumber(phone,name){
        client.validationRequests
        .create({friendlyName: name, phoneNumber: `+972${phone}`})
        .then(validationRequest => console.log(validationRequest.friendlyName))
        .catch(err=>console.log(err))
    }

function sendMessage(message,number){
    client.messages .create({
        body: message,
        messagingServiceSid: 'MG41d9597422d57eb1e1905f978c188744',
        to: `+972${number}`
    })
    .then(message => {
        console.log(message.sid);
        res.send({success: true,messageSid : message.sid})
    })
    .done();
}


module.exports = sms_router;