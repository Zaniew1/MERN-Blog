import nodemailer from 'nodemailer';
// require('dotenv').config();
import fs from 'fs';
import {convert}  from 'html-to-text';
type UserType = {
    email:string,
}
export default class  Email{
   private to:string
   private url: string
   private from: string
   
  constructor(user:UserType, url:string){
    this.to = user.email;
    this.url = url;
    this.from = `zaniew123@wp.pl`;
  }
  
  newTransport(){
    return nodemailer.createTransport({
      host: 'smtp.sendgrid.net',
      port: 587,
      secure: false,
      auth:{
        user:process.env.SENDGRID_USERNAME,
        pass:process.env.SENDGRID_PASSWORD
      }
    })
  }
  async send(template:string, subject:string){
    try{
      const html = fs.readFileSync(`./views/${template}.html`, 'utf-8');
      const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html: html,
      text: convert(html)
    }
    await this.newTransport().sendMail(mailOptions)
  }catch(err){console.log(err)}

  }
  async sendWelcome(){
    await this.send('WelcomeCard', 'Welcome in my application')
  }
  async sendPasswordReset() {
    await this.send(
      'ResetCard',
      'Your password reset token (valid for only 10 minutes)'
    );
  }
}