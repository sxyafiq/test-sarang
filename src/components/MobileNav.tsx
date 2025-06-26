"use client";

import { PRODUCT_CATEGORIES } from "@/config";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import FeaturedImage from "./FeaturedImage";
import { useAuth } from "@/hooks/use-auth";
import { User, Vendor } from "@/payload-types";
import { trpc } from "@/trpc/client";

interface MobileNavProps {
  signedIn: boolean;
  user?: User;
}

const MobileNav = ({ signedIn, user }: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { signOut } = useAuth();

  const pathname = usePathname();

  // whenever we click an item in the menu and navigate away, we want to close the menu
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // when we click the path we are currently on, we still want the mobile menu to close,
  // however we cant rely on the pathname for it because that won't change (we're already there)
  const closeOnCurrent = (href: string) => {
    if (pathname === href) {
      setIsOpen(false);
    }
  };

  // remove second scrollbar when mobile menu is open
  useEffect(() => {
    if (isOpen) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  const vendor = trpc.getVendorId.useQuery({
    userId: user?.id || "",
  });

  if (!isOpen)
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="lg:hidden relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
      >
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>
    );

  return (
    <div>
      <div className="relative z-40 lg:hidden">
        <div className="fixed inset-0 bg-black bg-opacity-25" />
      </div>

      <div className="fixed overflow-y-scroll overscroll-y-none inset-0 z-40 flex">
        <div className="w-4/5">
          <div className="relative flex w-full max-w-sm flex-col overflow-y-auto bg-white pb-12 shadow-xl">
            <div className="flex px-4 pb-2 pt-5">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            {signedIn ? (
              <div className="space-y-2 border-gray-200 px-4 py-6">
                {user &&
                user.role !== "user" &&
                user.role !== "admin" &&
                vendor &&
                vendor.isSuccess &&
                vendor.data ? (
                  <>
                    <div className="flow-root py-2 border-b border-gray-200">
                      <Link
                        onClick={() =>
                          closeOnCurrent(`/vendor/${vendor.data.docs[0].id}`)
                        }
                        href={`/vendor/${vendor.data.docs[0].id}`}
                        //href={"#"}
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        {vendor.data.docs[0].name as string}
                      </Link>
                    </div>
                    <div className="flow-root py-2 border-b border-gray-200">
                      <Link
                        onClick={() =>
                          closeOnCurrent(
                            `/backstage/collections/vendors/${vendor.data.docs[0].id}`
                          )
                        }
                        href={`/backstage/collections/vendors/${vendor.data.docs[0].id}`}
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        Update Vendor Profile
                      </Link>
                    </div>
                    <div className="flow-root py-2 border-b border-gray-200">
                      <Link
                        onClick={() => closeOnCurrent("/dashboard")}
                        href="/dashboard"
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        Vendor Dashboard
                      </Link>
                    </div>
                  </>
                ) : null}

                {user && user.role === "admin" ? (
                  <div className="flow-root py-2 border-b border-gray-200">
                    <Link
                      onClick={() => closeOnCurrent("/backstage")}
                      href={"/backstage"}
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Backstage
                    </Link>
                  </div>
                ) : null}

                <div className="flow-root py-2 border-b border-gray-200">
                  <Link
                    onClick={signOut}
                    href="/sign-in"
                    className="-m-2 block p-2 font-medium text-gray-900"
                  >
                    Log out
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-2 px-4 py-6">
                <div className="flow-root py-2 border-b border-gray-200">
                  <Link
                    onClick={() => closeOnCurrent("/sign-in")}
                    href="/sign-in"
                    className="-m-2 block p-2 font-medium text-gray-900"
                  >
                    Sign in
                  </Link>
                </div>
                <div className="flow-root py-2 border-b border-gray-200">
                  <Link
                    onClick={() => closeOnCurrent("/sign-up")}
                    href="/sign-up"
                    className="-m-2 block p-2 font-medium text-gray-900"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            )}

            <div className="mt-2">
              <ul>
                {PRODUCT_CATEGORIES.map((category) =>
                  !category.locked ? (
                    <li key={category.label} className="space-y-2 px-4 ">
                      <div className="border-b border-gray-200">
                        <div className="flex">
                          <p className="border-transparent text-gray-900 flex-1 whitespace-nowrap border-b-2 text-base font-medium">
                            {category.label}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-x-4">
                        {category.featured.map((item) => (
                          <div
                            key={item.name}
                            className="group relative text-sm"
                          >
                            <Link
                              href={item.href}
                              onClick={() => closeOnCurrent(item.href)}
                              className="mt-6 block font-medium text-gray-900"
                            >
                              <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                {/* @ts-ignore */}
                                <FeaturedImage category={item.value} />
                              </div>
                              {item.name}
                            </Link>
                          </div>
                        ))}
                      </div>
                    </li>
                  ) : (
                    <li key={category.label} className="space-y-2 px-4 pt-8">
                      <div className="border-b border-gray-200">
                        <div className="-mb-px flex">
                          <p className="border-transparent text-gray-900 flex-1 whitespace-nowrap border-b-2 py-4 text-base font-medium">
                            {category.label}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-x-4">
                        {category.featured.map((item) => (
                          <div
                            key={item.name}
                            className="group relative text-sm"
                          >
                            <Link
                              href={item.href}
                              onClick={() => closeOnCurrent(item.href)}
                              className="mt-6 block font-medium text-gray-900"
                            >
                              <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                <Image
                                  width={197}
                                  height={197}
                                  src={item.imageSrc}
                                  alt="product category image"
                                  className="aspect-square rounded-2xl"
                                  unoptimized={false}
                                />
                              </div>
                              {item.name}
                            </Link>
                          </div>
                        ))}
                      </div>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
