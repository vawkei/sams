const customizedEmail = require("./customizedEmail");

const sendPasswordResetEmail =({name,origin,token,email})=>{

    const resetURL = `${origin}/reset-password?token=${token}&email=${email}`
    const message = `<p>Please reset password by clicking on the following link:
    <a href="${resetURL}">Reset Password</a></p>`

    return customizedEmail({
        to: email,
        subject: "Reset Password",
        html: `<h4>Hello ${name}, ${message}`
    })

};

module.exports = sendPasswordResetEmail;