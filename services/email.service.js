import nodemailer from 'nodemailer'

export async function sendEmail(toEmail, subject, text)
{
    // Create the transporter using Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NODEMAIL_EMAIL,    // Your email
        pass: process.env.NODEMAIL_PASS,     // Your email password or app-specific password
      },
    });
  
    // Define the email options
    const mailOptions = {
      from: 'FCE&C Support <support@fceandc.com>',
      to: 'abhishekmagadum7@gmail.com',
      subject: subject,
      text: text,
    };
  
    try 
    {
      await transporter.sendMail(mailOptions);
      return
    } catch (error) 
    {
      throw error;
    }
  };
  