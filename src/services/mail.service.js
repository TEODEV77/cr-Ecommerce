import nodemailer from "nodemailer";

export default class MailService {
  constructor() {
    this.transport = nodemailer.createTransport({
      service: "gmail",
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  static getInstance() {
    if (!MailService.instance) {
      MailService.instance = new MailService();
    }
    return MailService.instance;
  }

  sendEmail(to, subject, html, attachments = []) {
    return this.transport.sendMail({
      from: 'teodev77.back@gmail.com',
      to,
      subject,
      html,
      attachments,
    });
  }
}
