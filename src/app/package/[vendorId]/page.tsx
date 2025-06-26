import ImageSlider from "@/components/ImageSlider";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductReel from "@/components/ProductReel";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { VENDOR_CATEGORIES } from "@/config";
import { getPayloadClient } from "@/get-payload";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCheck, Facebook, Heart, Instagram, MapPin } from "lucide-react";

import { getServerSideUser } from "@/lib/payload-utils";
import { cookies } from "next/headers";
import LikeButton from "@/components/LikeButton";
import { toast } from "@/components/ui/use-toast";
import Badge from "@/components/Badge";

import React, { Fragment } from "react";
//@ts-ignore
import escapeHtml from "escape-html";
import { Text } from "slate";
import DirectChat from "@/components/chat/DirectChat";
import { User, Vendor } from "@/payload-types";
import { Button } from "@/components/ui/button";
import ClaimVendor from "@/components/ClaimVendor";
import SimilarVendors from "@/components/SimilarVendors";
import IndvImageSlider from "@/components/IndvImageSlider";
import ExPackageTable from "@/components/ExPackageTable";

interface PageProps {
  params: {
    vendorId: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);

  const { vendorId } = params;

  const payload = await getPayloadClient();

  const { docs: vendors } = await payload.find({
    collection: "vendors",
    limit: 1,
    where: {
      id: {
        equals: vendorId,
      },
    },
  });

  const [product] = vendors as unknown as Vendor[];

  if (!product) return notFound();

  const vendCatLabel = (string: string) => {
    const category = VENDOR_CATEGORIES.find((cat) => cat.value === string);

    if (!category) {
      return null;
    }

    return category.label;
  };

  const BREADCRUMBS = [
    { id: 1, name: "Home", href: "/" },
    { id: 2, name: "Packages", href: "/packages" },
  ];

  const validUrls = product.images
    .map(({ image }) => (typeof image === "string" ? image : image.url))
    .filter(Boolean) as string[];

  const { docs: packages } = await payload.find({
    collection: "packages",
    where: {
      vendor: {
        equals: vendorId,
      },
    },
  });

  const VendUser = product.venduserid as User;

  //@ts-ignore
  const serialize = (children) =>
    //@ts-ignore
    children.map((node, i) => {
      if (Text.isText(node)) {
        let text = (
          <span dangerouslySetInnerHTML={{ __html: escapeHtml(node.text) }} />
        );
        //@ts-ignore
        if (node.bold) {
          text = <strong key={i}>{text}</strong>;
        }
        //@ts-ignore
        if (node.code) {
          text = <code key={i}>{text}</code>;
        }
        //@ts-ignore
        if (node.italic) {
          text = <em key={i}>{text}</em>;
        }

        // Handle other leaf types here...

        return <Fragment key={i}>{text}</Fragment>;
      }

      if (!node) {
        return null;
      }

      switch (node.type) {
        case "h1":
          return <h1 key={i}>{serialize(node.children)}</h1>;
        // Iterate through all headings here...
        case "h6":
          return <h6 key={i}>{serialize(node.children)}</h6>;
        case "blockquote":
          return <blockquote key={i}>{serialize(node.children)}</blockquote>;
        case "ul":
          return (
            <ul key={i} className="list-disc leading-relaxed">
              {serialize(node.children)}
            </ul>
          );
        case "ol":
          return <ol key={i}>{serialize(node.children)}</ol>;
        case "li":
          return <li key={i}>{serialize(node.children)}</li>;
        case "link":
          return (
            <Link
              href={escapeHtml(node.url)}
              key={i}
              target="_blank"
              className="no-underline hover:underline text-blue-500"
            >
              {serialize(node.children)}
            </Link>
          );

        default:
          return <p key={i}>{serialize(node.children)}</p>;
      }
    });

  //@ts-ignore
  const renderRichText = (data) => {
    // Function to recursively process JSON structure and return JSX
    // if (!data || !data.children) return null;

    //@ts-ignore
    return data.root.children.map((child, index) => {
      switch (child.type) {
        case "heading":
          return (
            <h3 key={index}>
              {/* @ts-ignore */}
              {child.children.map((text, textIndex) => (
                <span key={textIndex}>{text.text}</span>
              ))}
            </h3>
          );

        case "paragraph":
          return (
            <p key={index}>
              {/* @ts-ignore */}
              {child.children.map((text, textIndex) => (
                <span key={textIndex}>{text.text}</span>
              ))}
            </p>
          );

        case "text":
          // Just render the text inside a span (or other tag if needed)
          return <span key={index}>{child.text}</span>;

        default:
          return null;
      }
    });
  };

  if (user) {
    return (
      <>
        <div className="bg-[url('/hero.png')] bg-cover bg-center shadow-lg mb-10">
          <MaxWidthWrapper>
            <div className="grid grid-cols-1 md:grid-cols-2 py-3 items-center">
              <div className="aspect-square rounded-lg">
                <IndvImageSlider urls={validUrls} />
                {/* <p className="bg-white text-sm italic font-semibold p-4 mt-3 rounded-md shadow-md mx-4">
                  Photo Credits: {product.name}&apos;s
                  Instagram/Facebook/Website
                </p> */}
              </div>
              <div className="mx-auto max-w-2xl px-4 py-4 lg:py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:gap-x-8 lg:px-14">
                {/* Product Details */}
                <div className="lg:max-w-lg lg:self-end lg:min-w-96">
                  <ol className="hidden md:flex items-center space-x-2 pb-10">
                    {BREADCRUMBS.map((breadcrumb, i) => (
                      <li key={breadcrumb.href}>
                        <div className="flex items-center text-sm gap-2">
                          <Link
                            href={breadcrumb.href}
                            className="font-medium text-sm text-muted-foreground hover:text-gray-900"
                          >
                            {breadcrumb.name}
                          </Link>
                          {i !== BREADCRUMBS.length - 1 ? (
                            <svg
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                              className="ml-2 h-5 w-5 flex-shrink-0 text-gray-300"
                            >
                              <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                            </svg>
                          ) : null}
                        </div>
                      </li>
                    ))}
                  </ol>

                  <div className="bg-white p-6 rounded-sm shadow-md">
                    <div className="mt-4">
                      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        {product.name}
                      </h1>
                    </div>

                    {/* Claim */}
                    {VendUser.email === "sales@sarangsayang.com" ? (
                      <div className="mt-4">
                        {/* <ClaimVendor vendorName={product.name} /> */}
                        <Button variant={"outline"} className="w-full" asChild>
                          <Link href={"/become-a-vendor"}>
                            Claim This Vendor
                          </Link>
                        </Button>
                      </div>
                    ) : null}

                    <section className="mt-4">
                      <div className="flex items-center gap-4">
                        {product.facebook ? (
                          <Link href={product.facebook} target="_blank">
                            <Facebook className="h-6 w-6 flex-shrink-0 text-gray-400 cursor-pointer hover:text-gray-500" />
                          </Link>
                        ) : null}
                        {product.instagram ? (
                          <Link href={product.instagram} target="_blank">
                            <Instagram className="h-6 w-6 flex-shrink-0 text-gray-400 cursor-pointer hover:text-gray-500" />
                          </Link>
                        ) : null}
                      </div>

                      {product.bio ? (
                        <p className="mt-4 space-y-6 text-base text-muted-foreground">
                          {product.bio}
                        </p>
                      ) : //@ts-ignore
                      product.details ? (
                        <div className="mt-4 space-y-6 text-base text-muted-foreground">
                          {/* @ts-ignore */}
                          {product.details.root
                            ? //@ts-ignore
                              renderRichText(product.details)
                            : //@ts-ignore
                              serialize(product.details)}
                        </div>
                      ) : (
                        <div className="mt-4 space-y-6 text-base text-muted-foreground">
                          <p className="text-slate-400 italic">
                            Vendor details not disclosed.
                          </p>
                        </div>
                      )}

                      {/* Enquire */}
                      <div className="group flex items-center gap-8 text-sm text-medium mt-10">
                        {user ? (
                          <DirectChat
                            vendor={product}
                            user={user}
                            image={validUrls[0]}
                            label="Chat Now"
                          />
                        ) : null}
                        {user ? (
                          <LikeButton vendor={product} user={user.id} />
                        ) : (
                          <Heart
                            aria-hidden="true"
                            className="h-6 w-6 flex-shrink-0 text-gray-400 cursor-pointer"
                            onClick={() => {
                              toast({
                                title: "You gotta sign in first",
                                variant: "destructive",
                                action: (
                                  <Button
                                    asChild
                                    variant="outline"
                                    className="text-slate-900"
                                  >
                                    <Link href={"/sign-in"}>Sign in!</Link>
                                  </Button>
                                ),
                              });
                            }}
                          />
                        )}
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </MaxWidthWrapper>
        </div>

        <MaxWidthWrapper className="bg-white">
          <ExPackageTable pkg={product} user={user} />
        </MaxWidthWrapper>
      </>
    );
  }
  if (!user) {
    return (
      <>
        <MaxWidthWrapper className="mt-10">
          <div className="w-full rounded-lg p-7 bg-red-300 flex flex-row items-center justify-between">
            <div>
              <h1 className="font-bold">Oh no..</h1>
              <p>You have to be signed in first, my friend!</p>
            </div>

            <Button asChild variant={"secondary"}>
              <Link href={`/sign-in?origin=package/${vendorId}`}>Sign In</Link>
            </Button>
          </div>
        </MaxWidthWrapper>
      </>
    );
  }
};

export default Page;
