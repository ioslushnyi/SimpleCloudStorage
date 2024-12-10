import sendEmail from "../utils/sendEmail.js";

const sendVerificationEmail = (email, verificationLink) => {
  const subject = `Welcome! Your account on SimpleCloudStorage has been registered!`;
  const content = `Thank you for registering on SimpleCloudStorage! Please follow the link bellow to verify your email address:\n${verificationLink}`;
  sendEmail(email, subject, content);
};

export { sendVerificationEmail };
