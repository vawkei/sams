const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

const sendEmail = async (subject, send_to, template, reply_to, cc) => {
  // create email transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: process.env.EMAIL_HOST,
    port: 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Configure mailgen by setting a theme and your product info
  const mailGenerator = new Mailgen({
    theme: "salted",
    product: {
      // Appears in header & footer of e-mails
      name: "Sams webapp",
      link: "https://samsapp.vercel.app/",
    },
  });

  const emailTemplate = mailGenerator.generate(template);
  require("fs").writeFileSync("preview.html", emailTemplate, "utf8");

  //options for sending email:
  const options = {
    from: process.env.EMAIL_USER,
    to: send_to,
    reply_to: reply_to,
    subject: subject,
    html: emailTemplate,
    cc
  };

  //send email:
  transporter.sendMail(options,function(err,info){
    if(err){
        console.log(err)
    }else{
        console.log(info)
    }
  })
};
module.exports = sendEmail;
