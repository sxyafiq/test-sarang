import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";
import NavItems from "./NavItems";
import Likes from "./Likes";
import { getServerSideUser } from "@/lib/payload-utils";
import { cookies } from "next/headers";
import UserAccountNav from "./UserAccountNav";
import Image from "next/image";

import { BookHeart, MessageCircle } from "lucide-react";
import Enquiries from "./Enquiries";
import MobileNav from "./MobileNav";
import NormalUserAccountNav from "./NormalUserAccountNav";
import Chats from "./Chats";

const Navbar = async () => {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);

  return (
    <div className="bg-white sticky z-50 top-0 inset-x-0 h-16">
      <header className="relative bg-white">
        <MaxWidthWrapper>
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              {user && user.id ? (
                <MobileNav signedIn={true} user={user} />
              ) : (
                <MobileNav signedIn={false} />
              )}

              <div className="ml-4 flex lg:ml-0">
                <Link href="/">
                  <Image
                    unoptimized={true}
                    width={10}
                    height={10}
                    src="/logopng.png"
                    alt="logo"
                    className="w-10 h-10"
                  />
                </Link>
              </div>

              <div className="hidden z-50 lg:ml-8 lg:block lg:self-stretch">
                {user && user.id ? (
                  <NavItems signedIn={true} userId={user.id} />
                ) : (
                  <NavItems signedIn={false} />
                )}
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <Link href={"/become-a-vendor"}>
                    <p className="text-sm font-light text-slate-600 hover:text-slate-800 hover:underline cursor-pointer">
                      Become a vendor
                    </p>
                  </Link>

                  <span className="h-6 w-px bg-gray-200" aria-hidden="true" />

                  {user ? null : (
                    <Link
                      href="/sign-in"
                      className={buttonVariants({
                        variant: "ghost",
                      })}
                    >
                      Sign in
                    </Link>
                  )}

                  {user ? null : (
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  )}

                  {user ? null : (
                    <Link
                      href="/sign-up"
                      className={buttonVariants({
                        variant: "ghost",
                      })}
                    >
                      Create account
                    </Link>
                  )}

                  {user && user.role !== "user" && user.role !== "admin" ? (
                    <UserAccountNav user={user} />
                  ) : null}

                  {user && (user.role === "user" || user.role === "admin") ? (
                    <NormalUserAccountNav user={user} />
                  ) : null}

                  {user ? (
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  ) : null}

                  {user ? null : (
                    <div className="flex lg:ml-6">
                      <span
                        className="h-6 w-px bg-gray-200"
                        aria-hidden="true"
                      />
                    </div>
                  )}

                  {user ? (
                    <Likes user={user} />
                  ) : (
                    <div className="flow-root lg:ml-6">
                      <BookHeart
                        aria-hidden="true"
                        className="h-6 w-6 flex-shrink-0 text-gray-400"
                      />
                    </div>
                  )}

                  {user && user?.role !== "user" && user.role !== "admin" ? (
                    <div className="flex lg:ml-6">
                      <span
                        className="h-6 w-px bg-gray-200"
                        aria-hidden="true"
                      />
                    </div>
                  ) : null}

                  {user && user.role !== "user" && user.role !== "admin" ? (
                    <Enquiries user={user} />
                  ) : null}

                  <div className="flex lg:ml-6">
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  </div>

                  {user ? (
                    <Chats user={user} />
                  ) : (
                    <div className="flow-root lg:ml-6">
                      <MessageCircle
                        aria-hidden="true"
                        className="h-6 w-6 flex-shrink-0 text-gray-400"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default Navbar;
