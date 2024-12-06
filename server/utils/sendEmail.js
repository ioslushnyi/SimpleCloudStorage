import nodemailer from "nodemailer";

export default function sendEmail(email, subject, content) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  const mailOptions = {
    from: `"no-reply" <simplecloudstorage@trial-pxkjn41ezjqlz781.mlsender.net>`, // sender address
    to: email,
    subject: subject,
    text: content,
  };
  try {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
    });
  } catch (err) {
    console.log(err.message);
  }
}
