import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "fad250bdc59699",
    pass: "2c2ef6e3e7e1c7"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({subject, body}: SendMailData) {
     await transport.sendMail({
    from: 'Equipe Feedget <oi@feedget.com>',
    to: 'Paulo Fontes <paulomfontes@gmail.com>',
    subject,
    html: body,
  });
  }
}