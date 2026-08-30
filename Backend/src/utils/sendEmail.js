import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
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

        console.log("✅ Email sent:", info.messageId);

        return info;

    } catch (error) {
        console.log("❌ EMAIL ERROR");
        console.log("Code:", error.code);
        console.log("Command:", error.command);
        console.log("Message:", error.message);

        throw error;
    }
};

export default sendEmail;