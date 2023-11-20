import nodemailer from 'nodemailer';
import 'dotenv/config';
import fs from 'fs';
import {convert}  from 'html-to-text';
import { BlogSchemaType } from '../types/blogTypes';
type UserType = {
    email:string,
}
type ResetCardData = {
  // Define the properties you want to pass to the template
  resetToken?: string;
  name?: string;
  title?: BlogSchemaType
};
export default class Email{
   private to:string
   private data: ResetCardData
   private from: string
   
  constructor(user:UserType, data:{}){
    this.to = user.email;
    this.data = data;
    this.from = `zaniew123@wp.pl`;
  }
  private populateTemplate(html: string, data:ResetCardData) {
    // Replace placeholders in the HTML with actual data
    // For example, assuming there is a placeholder '{{resetToken}}' in your HTML
    let populatedHtml;
    const dataPass = this.data;
    if(dataPass?.resetToken){
      populatedHtml = html.replace('{{resetURL}}', dataPass?.resetToken);
    }
    if(dataPass?.name){
      populatedHtml = html.replace('{{name}}', dataPass?.name);
    }
    if(dataPass?.title){
      // populatedHtml = html.replace('{{title}}', dataPass?.title);

    }
    return populatedHtml;
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
  async send(template:string, subject:string, dataToPass:{}){
    try{
      let newData = this.data
      let html = fs.readFileSync(`./views/${template}.html`, 'utf-8');
      const populatedHtml = newData ? this.populateTemplate(html, newData) : html
      const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html: populatedHtml,
      text: convert(html)
    }
    await this.newTransport().sendMail(mailOptions)
  }catch(err){console.log(err)}

  }
  async sendWelcome(){
    let newData = this.data
    await this.send('WelcomeCard', 'Welcome in my application', { newData })
  }
  async sendPasswordReset() {
    let newData = this.data
    await this.send('ResetCard', 'Your password reset token (valid for only 10 minutes)', { newData });
  }
  async sendNewsletter(){
    let newData = this.data
    await this.send('Newsletter', 'Hi, new post has appear, check it out!', { newData });
  }
}