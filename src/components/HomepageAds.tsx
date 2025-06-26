"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { Badge } from "./ui/badge";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { useState } from "react";
import { sendContactUs } from "@/actions/sendContactUs";
import { trpc } from "@/trpc/client";

const HomepageAds = () => {
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const checkUser = trpc.checkUserExist.useQuery({
    email: contactData.email,
  });

  const addClick = trpc.addClick.useMutation();

  return (
    <section>
      <Carousel
      // plugins={[
      //   Autoplay({
      //     delay: 3000,
      //   }),
      // ]}
      >
        <CarouselContent>
          <CarouselItem className="flex flex-col items-center justify-center p-6">
            <Link
              href={`https://www.instagram.com/agent.naimsalim/`}
              target="_blank"
              onClick={() => {
                addClick.mutate({
                  vendorId: "656b22ee0eaa6fb36a30a312",
                });
              }}
            >
              <Image
                width={1100}
                height={220}
                src="/ads/ANSBanner2.jpg"
                alt="ad1"
                unoptimized={true}
              />
            </Link>
            <div className="w-full flex justify-end">
              <Badge variant="outline">Ad</Badge>
            </div>
          </CarouselItem>
          {/* <CarouselItem className="flex flex-col items-center justify-center p-6">
            <Link
              href={`https://www.glistengrandeur.com/`}
              target="_blank"
              onClick={() => {
                addClick.mutate({
                  vendorId: "656b22ee0eaa6fb36a30a312",
                });
              }}
            >
              <Image
                width={1100}
                height={220}
                src="/ads/1.png"
                alt="ad2"
                unoptimized={true}
              />
            </Link>
            <div className="w-full flex justify-end">
              <Badge variant="outline">Ad</Badge>
            </div>
          </CarouselItem> */}
          {/* <CarouselItem className="flex flex-col items-center justify-center p-6">
            <Dialog>
              <DialogTrigger asChild>
                <Image
                  width={1100}
                  height={220}
                  src="/ads/SSHomepageAds.jpg"
                  alt="ad1"
                  unoptimized={true}
                  className="cursor-pointer"
                />
              </DialogTrigger>
              <DialogContent>
                <DialogHeader className="mb-3">
                  <DialogTitle>Enquire Ad Space Packages</DialogTitle>
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
                        <Button
                          type="submit"
                          variant="secondary"
                          className="w-full"
                        >
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
            <div className="w-full flex justify-end">
              <Badge variant="outline">Ad</Badge>
            </div>
          </CarouselItem> */}
        </CarouselContent>
        <CarouselPrevious className="hidden bg-slate-200" />
        <CarouselNext className="hidden bg-slate-200" />
      </Carousel>
    </section>
  );
};

export default HomepageAds;
