const nodemailer = require("nodemailer");


const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: "dixitparmar6113@gmail.com",
      pass: process.env.MAIL_KEY,
    },
  });

  const mailoptions = {
    from: "dixitparmar6113@gmail.com",
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html
  };

  await transporter.sendMail(mailoptions);
};

module.exports = sendEmail;