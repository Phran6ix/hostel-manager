import nodemailer, { Transporter } from "nodemailer";
import Constants from "../utilities/constant";
import Config from "../utilities/config";

export default class EmailService {
  public to: string;
  private subject: string;
  private message: string;
  private transport: Transporter; //any = ""

  constructor(payload: { email: string; subject: string; message: string }) {
    this.to = payload.email;
    this.subject = payload.subject;
    this.message = payload.message;

    this.transport = this.initializeTranspot();
  }

  private initializeTranspot() {
    if (Config.NODE_ENV == Constants.NODE_ENVIRONMENT.DEVELOPMENT) {
      return nodemailer.createTransport({
        host: Config.SMTP_HOST,
        port: +Config.SMTP_PORT,
        auth: {
          user: Config.SMTP_USER,
          pass: Config.SMTP_PASS,
        },
      });
    } else {
      return this.transport;
    }
    // if (Config.NODE_ENV == Constants.NODE_ENVIRONMENT.PRODUCTION) {
    //   //   return this.transport.sendMail(t)
    // }
  }

  private get option(): { to: string; from: string; subject: string; text: string } {
    return {
      to: this.to,
      from: "no-reply@gmail.com",
      subject: this.subject,
      text: this.message,
    };
  }

  // private option = {
  //   to: this.to,
  //   from: "no-reply@gmail.com",
  //   subject: this.subject,
  //   message: this.message,
  // };

  public async sendMail() {
    return await this.transport.sendMail(this.option);
  }
}
