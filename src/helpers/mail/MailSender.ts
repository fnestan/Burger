import nodemailer from "nodemailer";

export class MailSender {

    static async sendMail(email: string, chaine: string) {
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
        const url = "http://localhost:3000/users/resetPassword/" + chaine;
        const mailOptions = {
            from: 'no-reply@message.com',
            to: email,//user.email,
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
