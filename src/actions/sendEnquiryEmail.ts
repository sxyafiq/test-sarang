'use server'
import EnquiryEmail from "@/components/emails/EnquiryEmail";
import React from "react";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface Data {
    email: string
}

export const sendEnquiryEmail = async ({email}: Data) => {
    //const email = formData.get('email')
    //console.log('connected')
    //console.log(email)

    resend.emails.send({
        from: 'Sarang Sayang <admin@sarangsayang.com>',
        to: ['admin@sarangsayang.com', 'sales@sarangsayang.com', `${email}`],
        subject: `Sarang Sayang: You've received 1 new enquiry`,
        react: React.createElement(EnquiryEmail)
    })
}