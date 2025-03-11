import { PASSWORD_RESET_SUCCESS_TEMPLATE,
    PASSWORD_RESET_REQUEST_TEMPLATE,
    VERIFICATION_EMAIL_TEMPLATE
}from './email-template.js'
import transporter from './mailtrap-config.js'
export const sendVerificationEmail = async (email,verificationToken) => {
try{
   const mailOptions = {
      from :`"Code Arena" <akshattiwari771@gmail.com>`,
      to :email,
      subject :'verify your email;',
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
   }
    await transporter.sendMail(mailOptions);
  
} catch (error) {
   throw new Error("Error in sending verification email: " + error);
}
} 

export const sendWelcomeEmail = async(email,name)=>{
   try {
       const mailOptions={
           from:`"Code Arena"<akshattiwari771@gmail.com>`,
           to:email,
           subject: "Welcome to Our Service",
           html: `<h1>Welcome, ${name}!</h1><p>Thank you for joining us.</p>`, 
       }
       await transporter.sendMail(mailOptions)
     
   } catch (error) {
       throw new Error("Error in sending Welcome email" + error)
   }
}

export const sendResetPasswordEmail= async(email,resetURL)=>{
try {
   const mailOptions = {
       from: `"Code Arena" <akshattiwari771@gmail.com>`,
       to: email,
       subject: "Reset your password",
       html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
   };

    await transporter.sendMail(mailOptions);
   
} catch (error) {
   console.error("Error sending password reset email", error);
   throw new Error("Error sending password reset email: " + error);
}
}
export const sendResetSuccessEmail = async (email)=> {
   try {
       const mailOptions = {
           from: `"Code Arena" <tiwariakshat1169@gmail.com>`,
           to: email,
           subject: "Password Reset Successful",
           html: PASSWORD_RESET_SUCCESS_TEMPLATE,
       };

        await transporter.sendMail(mailOptions);
   } catch (error) {
       console.error("Error sending password reset success email", error);
       throw new Error("Error sending password reset success email: " + error);
   }
}

       