import * as nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  //host: 'smtp.ethereal.email',
  service: "gmail",
 // port: 587,
  //secure: false, 
  auth: {
    user: 'hamza.zenkoders@gmail.com', 
    pass: 'iwxi ldjx mppt mexe',
  },
});
