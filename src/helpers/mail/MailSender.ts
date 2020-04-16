import nodemailer from "nodemailer";
import randomstring from "randomstring";

export class MailSender {

    static async sendMail(email: string) {
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: 'nestanfrantz@gmail.com',
                pass: 'frantz123456789'

            },
            tls: {
                rejectUnauthorized: false
            }
        });
        const chaine = randomstring.generate({
            length: 50,
            charset: 'alphabetic'
        });
        const url = "http://localhost:3000/users/" + chaine + "/resetPassword";
        const mailOptions = {
            from: 'no-reply@message.com',
            to: 'fnestan@myges.fr',//user.email,
            subject: 'Thanks to your oder',
            text: 'Rendez-vous sur cette url pour reinitialiser votre mdp: ' + url,
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);

            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}
