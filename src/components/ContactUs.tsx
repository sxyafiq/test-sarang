import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { sendContactUs } from "@/actions/sendContactUs";
import { trpc } from "@/trpc/client";

const ContactUs = () => {
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const checkUser = trpc.checkUserExist.useQuery({
    email: contactData.email,
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className="text-sm text-muted-foreground cursor-pointer hover:underline">
          Contact Us
        </p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="mb-3">
          <DialogTitle>Something you wanna tell us?</DialogTitle>
        </DialogHeader>
        <form
          action={async (contactData) => {
            await sendContactUs(contactData);
          }}
        >
          <div className="flex items-center space-x-2 pb-4">
            <div className="grid flex-1 gap-3">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={contactData.name}
                  onChange={(e) => {
                    setContactData({
                      ...contactData,
                      name: e.target.value,
                    });
                  }}
                />
              </div>

              <div>
                <Label htmlFor="email">
                  Registered Sarang Sayang Email{" "}
                  <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  value={contactData.email}
                  onChange={(e) => {
                    setContactData({
                      ...contactData,
                      email: e.target.value,
                    });
                  }}
                />
              </div>

              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={contactData.message}
                  onChange={(e) => {
                    setContactData({
                      ...contactData,
                      message: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              {checkUser.data &&
              checkUser.data.totalDocs === 1 &&
              contactData.email != "" ? (
                <Button type="submit" variant="secondary" className="w-full">
                  Submit
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="secondary"
                  className="w-full"
                  disabled
                >
                  Submit
                </Button>
              )}
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactUs;
