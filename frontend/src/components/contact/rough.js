// ContactForm.js
// import React, { useState } from 'react';

// const ContactForm = () => {
//   const [name, setName] = useState('');
//   const [subject, setSubject] = useState('');
//   const [message, setMessage] = useState('');
//   const [attachment, setAttachment] = useState(null);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setAttachment(file);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append('name', name);
//     formData.append('subject', subject);
//     formData.append('message', message);
//     formData.append('attachment', attachment);

//     // Send the form data to your backend API
//     try {
//       const response = await fetch('/api/contact', {
//         method: 'POST',
//         body: formData,
//       });

//       if (response.ok) {
//         console.log('Email sent successfully');
//         // Handle success (redirect or show a success message)
//       } else {
//         console.error('Failed to send email');
//         // Handle failure (show an error message)
//       }
//     } catch (error) {
//       console.error('Error sending email:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       {/* Other form fields... */}
//       <label>Attachment:</label>
//       <input type="file" onChange={handleFileChange} />

//       <button type="submit">Send message</button>
//     </form>
//   );
// };

// export default ContactForm;



// contactController.js
// const sendContactEmail = require('./sendContactEmail');

// const contactController = async (req, res) => {
//   const { name, subject, message } = req.body;
//   const attachment = req.file; // Assuming you are using middleware to handle file uploads

//   try {
//     await sendContactEmail({ name, subject, message, attachment });
//     res.status(200).json({ success: true, message: 'Email sent successfully' });
//   } catch (error) {
//     console.error('Error sending email:', error);
//     res.status(500).json({ success: false, message: 'Failed to send email' });
//   }
// };

// module.exports = contactController;



// sendContactEmail.js
// const nodemailer = require('nodemailer');
// const customizedEmail = require('./customizedEmail');

// const sendContactEmail = async ({ name, subject, message, attachment }) => {
//   const transporter = nodemailer.createTransport({
//     // Your nodemailer transport configuration
//   });

//   return customizedEmail({
//     to: process.env.EMAIL_USER,
//     subject: subject,
//     html: `<h4>name: ${name} </h4>.
//           <p>${message}</p>.`,
//     attachments: [
//       {
//         filename: attachment.originalname,
//         content: attachment.buffer,
//         encoding: 'base64',
//       },
//     ],
//   });
// };

// module.exports = sendContactEmail;
