import nodemailer from 'nodemailer';
import 'dotenv/config';
import fs from 'fs';
import {convert}  from 'html-to-text';
export default class Email{
   private to:string
   private data: string
   private from: string
   
  constructor(email:string, data:string){
    this.to = email;
    this.data = data;
    this.from = `zaniew123@wp.pl`;
  }
  private populateTemplate(html: string, data:string) {
    // Replace placeholders in the HTML with actual data
    return html.replace(/{{textToReplace}}/g, `${data}` );;
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
      let html = fs.readFileSync(`./views/${template}.html`, 'utf-8');
      const populatedHtml = this.data ? this.populateTemplate(html, this.data) : html
      const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html: populatedHtml,
      text: convert(populatedHtml)
    }
    await this.newTransport().sendMail(mailOptions)
  }catch(err){console.log(err)}

  }
  async sendWelcome(){
      console.log(this.to)
      console.log(this.data)
    await this.send('WelcomeCard', 'Welcome in my application')
  }
  async sendPasswordReset() {
    await this.send('ResetCard', 'Your password reset token (valid for only 10 minutes)');
  }
  async sendNewsletter(){
    await this.send('Newsletter', 'Hi, new post has appear, check it out!');
  }
}