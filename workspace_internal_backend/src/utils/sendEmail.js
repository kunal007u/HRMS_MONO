const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

const sendMail = async (to, subject, body, cc, threadId) => {
    try {
        const messageId = threadId? `<${threadId}@pragetx.com>` : undefined;
        const mail = {
            from: process.env.SMTP_FROM,
            to,
            cc,
            subject: subject,
            html: body,
            messageId: messageId,
            references: messageId,
            inReplyTo: messageId
        };
        await transporter.sendMail(mail);
    } catch (error) {
        console.log('Error occurred while sending email:', error);
    }
};

module.exports = sendMail;