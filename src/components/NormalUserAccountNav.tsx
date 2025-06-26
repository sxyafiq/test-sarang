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

const NormalUserAccountNav = ({ user }: { user: User }) => {
  const { signOut } = useAuth();

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

        {user.role === "admin" ? (
          <DropdownMenuItem asChild>
            <Link href="/backstage">Backstage</Link>
          </DropdownMenuItem>
        ) : null}

        {user.role === "admin" ? (
          <DropdownMenuItem
            asChild
            className="bg-gradient-to-r from-gray-300 to-slate-100 hover:to-gray-300"
          >
            <Link href="/kylokloud">Kylo Kloud</Link>
          </DropdownMenuItem>
        ) : null}

        {user.role === "admin" ? (
          <DropdownMenuItem asChild>
            <Link href="/featureconsole">Feature Console</Link>
          </DropdownMenuItem>
        ) : null}

        {user.role === "admin" ? (
          <DropdownMenuItem asChild>
            <Link href="/leadtracker">Lead Tracker</Link>
          </DropdownMenuItem>
        ) : null}

        {user.role === "admin" ? (
          <DropdownMenuItem asChild>
            <Link href="/graphy">Graphy</Link>
          </DropdownMenuItem>
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

export default NormalUserAccountNav;
