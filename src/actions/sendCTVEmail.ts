"use server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendCTVEmail = async (formData: FormData) => {
  const vendor = formData.get("vendor");
  const name = formData.get("name");
  const contact = formData.get("contact");
  const email = formData.get("email");

  resend.emails.send({
    from: "Admin <admin@sarangsayang.com>",
    to: ["admin@sarangsayang.com", "sales@sarangsayang.com"],
    subject: `Give Me Access: ${vendor}`,
    html: `
            <div>
                <p>Vendor Name: ${vendor}</p>
                <p>Name: ${name}</p>
                <p className='capitalize'>Contact: ${contact}</p>
                <p>Email: ${email}</p>
            </div>
        `,
  });
};
