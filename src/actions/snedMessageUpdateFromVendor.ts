"use server";
import MessageUpdateFromVendorEmail from "@/components/emails/users/MessageUpdateFromVendor";
import React from "react";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface Data {
  userEmail: string;
  userName: string;
  vendorName: string;
  message: string;
}

export const sendMessageUpdateFromVendor = async ({
  userEmail,
  userName,
  vendorName,
  message,
}: Data) => {
  resend.emails.send({
    from: "Sarang Sayang <admin@sarangsayang.com>",
    to: [`${userEmail}`],
    subject: `Message From ${vendorName} on Sarang Sayang!`,
    react: React.createElement(MessageUpdateFromVendorEmail, {
      userName: userName,
      vendorName: vendorName,
      message: message,
    }),
  });
};
