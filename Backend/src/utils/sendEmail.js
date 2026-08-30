import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,

    family: 4,

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },

    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
});

const sendEmail = async ({
    email,
    subject,
    message,
}) => {
    try {

        console.log("Sending email to:", email);

        const info = await transporter.sendMail({
            from: `"CareerMind AI" <${process.env.EMAIL_USER}>`,
            to: email,
            subject,
            text: message,
        });

        console.log("Email sent:", info.messageId);

        return info;

    } catch (error) {

        console.log("EMAIL ERROR:", error);

        throw error;
    }
};

export default sendEmail;