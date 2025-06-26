"use server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendDSVEmail = async (formData: FormData) => {
  const vendorName = formData.get("vendorName");
  const cat = formData.get("category");
  const name = formData.get("name");
  const contact = formData.get("contact");
  const email = formData.get("email");

  resend.emails.send({
    from: "Admin <admin@sarangsayang.com>",
    to: ["admin@sarangsayang.com", "sales@sarangsayang.com"],
    subject: `Payment Attempt by: ${name}`,
    html: `
              <div>
                  <p>Vendor Name: ${vendorName}</p>
                  <p className='capitalize'>Category: ${cat}</p>
                  <p>Name: ${name}</p>
                  <p>Contact Number: ${contact}</p>
                  <p>Email: ${email}</p>
              </div>
          `,
  });
};
