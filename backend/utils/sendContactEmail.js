const nodemailer = require("nodemailer");
const customizedEmail = require("./customizedEmail");

const sendContactEmail = async ({
  name,
  subject,
  message,
  senderEmailAddress,
}) => {
  return customizedEmail({
    to: process.env.EMAIL_USER,
    subject: subject,
    html: `<h4>name: ${name} </h4>.
          <h4> email address: ${senderEmailAddress} </h4>. 
          <p>${message}</p>.`
  });
};

module.exports = sendContactEmail;
