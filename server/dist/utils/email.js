"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
require("dotenv/config");
const fs_1 = __importDefault(require("fs"));
const html_to_text_1 = require("html-to-text");
class Email {
    constructor(email, data) {
        this.to = email;
        this.data = data;
        this.from = `zaniew123@wp.pl`;
    }
    populateTemplate(html, data) {
        // Replace placeholders in the HTML with actual data
        return html.replace(/{{textToReplace}}/g, `${data}`);
        ;
    }
    newTransport() {
        return nodemailer_1.default.createTransport({
            host: 'smtp.sendgrid.net',
            port: 587,
            secure: false,
            auth: {
                user: process.env.SENDGRID_USERNAME,
                pass: process.env.SENDGRID_PASSWORD
            }
        });
    }
    send(template, subject) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let html = fs_1.default.readFileSync(`./views/${template}.html`, 'utf-8');
                const populatedHtml = this.data ? this.populateTemplate(html, this.data) : html;
                const mailOptions = {
                    from: this.from,
                    to: this.to,
                    subject,
                    html: populatedHtml,
                    text: (0, html_to_text_1.convert)(populatedHtml)
                };
                yield this.newTransport().sendMail(mailOptions);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    sendWelcome() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(this.to);
            console.log(this.data);
            yield this.send('WelcomeCard', 'Welcome in my application');
        });
    }
    sendPasswordReset() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.send('ResetCard', 'Your password reset token (valid for only 10 minutes)');
        });
    }
    sendNewsletter() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.send('Newsletter', 'Hi, new post has appear, check it out!');
        });
    }
}
exports.default = Email;
