"use client";

import { User } from "@/payload-types";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { trpc } from "@/trpc/client";

const UserAccountNav = ({ user }: { user: User }) => {
  const { signOut } = useAuth();

  const isVendor = user?.role === "vendor" || user?.role === "supervendor";

  const vendor = trpc.getVendorId.useQuery({
    userId: user.id,
  });

  const userRole = user?.role;
  //var userRole = 'supervendor'

  const bgVendor =
    userRole === "vendor"
      ? "bg-blue-200 hover:bg-blue-100"
      : "bg-yellow-200 hover:bg-yellow-100";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="overflow-visible">
        <Button variant="ghost" size="sm" className="relative">
          My account
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-white w-60" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-0.5 leading-none">
            <p className="font-medium text-sm text-black text-balance">
              Welcome back, {user.name}!
            </p>
          </div>
        </div>

        <DropdownMenuSeparator />

        {isVendor && vendor.data ? (
          <>
            {vendor.data.docs.map((vendor) => (
              <DropdownMenuItem key={vendor.id} asChild>
                <Link href={`/vendor/${vendor.id}`}>
                  {vendor.name as string}
                </Link>
              </DropdownMenuItem>
            ))}

            {/* <DropdownMenuItem asChild>
              <Link href={`/vendor/${vendor.data.docs[0].id}`}>
                {vendor.data.docs[0].name as string}
              </Link>
            </DropdownMenuItem> */}

            {vendor.data.docs.length > 1 ? (
              <DropdownMenuItem asChild>
                <Link href={`/backstage/collections/vendors`}>
                  Update Vendor Profiles
                </Link>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem asChild>
                <Link
                  href={`/backstage/collections/vendors/${vendor.data.docs[0].id}`}
                >
                  Update Vendor Profile
                </Link>
              </DropdownMenuItem>
            )}

            <DropdownMenuItem asChild>
              <Link href="/dashboard">Vendor Dashboard</Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link href="/addons">Vendor Add Ons</Link>
            </DropdownMenuItem>
          </>
        ) : null}

        <DropdownMenuItem asChild>
          <Link href="/faq">FAQ</Link>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={signOut} className="cursor-pointer">
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
