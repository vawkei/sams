const customizedEmail = require("./customizedEmail");

const sendNewsletterMail =async ({subject,message,email})=>{

    return customizedEmail({
        bcc: email, //use BCC (Blind Carbon Copy) field instead of the TO field. This way, each recipient will receive the email without seeing the other recipients' addresses.
        subject: subject,
        html: `<h4>Hi there!</h4>${message}`
        // html: `<p>${message}</p>`
    })
};

module.exports= sendNewsletterMail;