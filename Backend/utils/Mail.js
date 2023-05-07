const nodemailer = require("nodemailer");

const generateOTP = () => {
  let otp = "";
  for (let i = 0; i <= 3; i++) {
    const randVal = Math.round(Math.random() * 9);
    otp = otp + randVal;
  }
  return otp;
};

const MailTransport = () => {
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USERNAME,
      pass: process.env.MAILTRAP_PASSWORD,
    },
  });
  return transport;
};

const generateEmailTemplate = (code) => {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
    </head>
    <body>
        <div style="align-items: center; justify-content: center;">
            <h1 style="font-weight: bold; text-align: center;background-color: rgb(85, 176, 255);width: '50%';height: '20vh';">We are delight to welcome to our Team!</h1>
            <p style="text-align: center;">Please verify your email your verification code is</p>
            <h1 style="text-align: center;">${code}</h1>
        </div>
        
    </body>
    </html>`;
};
const plainEmailTemplate = (heading, message) => {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
    </head>
    <body>
        <div style="align-items: center; justify-content: center;">
            <h1 style="font-weight: bold; text-align: center;background-color: rgb(85, 176, 255);width: '50%';height: '20vh';">${heading}</h1>
            <p style="text-align: center;">${message}</p>
           
        </div>
        
    </body>
    </html>`;
};

module.exports = {
  generateOTP,
  generateEmailTemplate,
  MailTransport,
  plainEmailTemplate,
};
