import { Resend } from "resend";

const resend = new Resend(
    process.env.RESEND_API_KEY
);

const sendEmail = async ({
    email,
    subject,
    message,
}) => {

    try {

        console.log("Sending email to:", email);

        const { data, error } = await resend.emails.send({
            from: "CareerMind AI <onboarding@resend.dev>",
            to: [email],
            subject: subject,
            text: message,
        });

        if (error) {
            console.error("Resend error:", error);
            throw new Error(error.message);
        }

        console.log(
            "Email sent successfully:",
            data
        );

        return data;

    } catch (error) {

        console.error(
            "EMAIL ERROR:",
            error
        );

        throw error;
    }
};

export default sendEmail;