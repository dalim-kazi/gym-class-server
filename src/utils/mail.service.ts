import envConfig from '@/configs/envConfig';
import nodemailer from 'nodemailer';

export const sendEmail = async (to: string, subject: string, html: string, from?: string) => {
    try {
        const transporter = nodemailer.createTransport({
            host: envConfig.SMTP_HOST,
            port: 587,
            secure: false,
            auth: {
                user: envConfig.SMTP_USER,
                pass: envConfig.SMTP_PASSWORD
            }
        });

        const response = await transporter.sendMail({
            from: from ? from : envConfig.SMTP_FROM,
            to: to,
            subject: subject,
            html
        });

        return response;
    } catch (error: any) {
        throw new Error(`Mail Send Failed: ${error?.message}`);
    }
};
