"use client";

import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import { Dot, Instagram } from "lucide-react";
import Image from "next/image";
import ContactUs from "./ContactUs";

const Footer = () => {
  return (
    <footer className="bg-white flex-grow-0">
      <MaxWidthWrapper>
        <div className="py-10 md:flex md:items-center md:justify-between">
          {/* left */}
          <div className="flex justify-center md:justify-start">
            <div className="flex flex-row gap-1 items-center">
              <p className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} Sarang Sayang
              </p>
              <p className="text-sm text-muted-foreground">
                <Dot />
              </p>
              <ContactUs />
              {/* <p className="text-sm text-muted-foreground">
              <Dot />
            </p>
            <p className="text-sm text-muted-foreground">
              <Link href={"/terms"} className="hover:underline" target="_blank">
                Terms
              </Link>
            </p> */}
              <p className="text-sm text-muted-foreground">
                <Dot />
              </p>
              <p className="text-sm text-muted-foreground">
                <Link href={"/faq"} className="hover:underline" target="_blank">
                  FAQ
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center md:mt-0">
            <div className="flex space-x-2">
              <Link
                href={"https://www.tiktok.com/@sarangsayang.sg"}
                className="text-sm text-muted-foreground hover:text-gray-600"
                target="_blank"
              >
                <Image
                  src={"/tiktok.png"}
                  alt={"tiktok"}
                  width={25}
                  height={25}
                  className="rounded-md"
                />
              </Link>
              <Link
                href={"https://www.instagram.com/sarangsayangsg/"}
                className="text-sm text-muted-foreground hover:text-gray-600"
                target="_blank"
              >
                <Instagram width={25} height={25} />
              </Link>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
