import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,

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

        console.log("Email user:", process.env.EMAIL_USER);
        console.log("Sending to:", email);

        const info = await transporter.sendMail({
            from: `"CareerMind AI" <${process.env.EMAIL_USER}>`,
            to: email,
            subject,
            text: message,
        });

        console.log("Email sent successfully:", info.messageId);

        return info;

    } catch (error) {

        console.error("EMAIL ERROR:");
        console.error("Code:", error.code);
        console.error("Command:", error.command);
        console.error("Message:", error.message);

        throw error;
    }
};

export default sendEmail;