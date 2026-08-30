import nodemailer from "nodemailer";

const sendEmail = async ({
    email,
    subject,
    message,
}) => {

    const transporter = nodemailer.createTransport({
        service: "gmail",

        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    await transporter.sendMail({
        from: `"CareerMind AI" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: subject,
        text: message,
    });
};

export default sendEmail;