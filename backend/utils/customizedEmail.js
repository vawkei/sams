const nodemailer = require("nodemailer");

const customizedEmail = async ({ subject, to, html }) => {
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

  return transporter.sendMail({
    from: '"Sams"<sams@gmail.com>',
    to,
    subject,
    html,
  });
};

module.exports = customizedEmail;
