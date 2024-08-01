import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import { UserModel } from "../interfaces";

export default class Email {
    private transporter: nodemailer.Transporter;
    private user: UserModel;
    private data: any;

    constructor(user: UserModel, data: any) {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_APP_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        });

        this.user = user;
        this.data = data;
    }

    private send = async (message: nodemailer.SendMailOptions) => {
        try {
            const info = await this.transporter.sendMail(message);
            return {
                msg: "Email sent",
                info: info.messageId,
                preview: nodemailer.getTestMessageUrl(info),
            };
        } catch (err) {
            return { msg: err };
        }
    };

    public sendPasswordReset = async () => {
        const MailGenerator = new Mailgen({
            theme: "default",
            product: {
                name: "BLOG WEBSITE",
                link: "google.com",
            },
        });

        const response = {
            body: {
                name: this.user.firstName,
                intro: "Your password reset request has been received. Please click the button below to reset your password.",
                action: {
                    instructions: `Click the button below to reset your password: ${this.data.verificationUrl}`,
                    button: {
                        color: "#22BC66",
                        text: "Reset your password",
                        link: "google.com",
                    },
                },
            },
        };

        const mail = MailGenerator.generate(response);
        const message: nodemailer.SendMailOptions = {
            from: "irvan17051999@gmail.com",
            to: "irvandta@gmail.com",
            subject: "Password Reset",
            html: mail,
        };
        await this.send(message);
    };
}