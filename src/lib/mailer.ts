import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';

export async function mailer(email: string, link: string) {
    try {
        let transporter = nodemailer.createTransport(
            smtpTransport({
                host: 'smtp.gmail.com',
                auth: {
                    user: 'servicecontroluz@gmail.com',
                    pass: 'krnmkowqgvjlxwfg',
                },
            }),
        );

        let info = await transporter.sendMail({
            from: `servicecontroluz@gmail.com`,
            to: email,
            subject: 'Forget password ?',
            html: `<a href="http://localhost:3001/api/recover-password?token=${link}" style="width: auto; background-color: lightgreen; padding: 30px 25px; text-decoration: none; color: black; font-weight: bold; font-size: 24px;">PASSWORD RECOVER LINK</a>`,
        });

        if (info.accepted) {
            return 200;
        }
    } catch (error) {}
}
