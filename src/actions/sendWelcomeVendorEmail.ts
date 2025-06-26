"use server";
import WelcomeVendorEmail from "@/components/emails/vendors/WelcomeVendorEmail";
import React from "react";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface Data {
  email: string;
}

export const sendWelcomeVendorEmail = async ({ email }: Data) => {
  resend.emails.send({
    from: "Sarang Sayang <admin@sarangsayang.com>",
    to: [`${email}`],
    subject: `You're an Official Sarang Sayang Vendor!`,
    react: React.createElement(WelcomeVendorEmail),
  });
};
