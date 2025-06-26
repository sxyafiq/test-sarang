"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";

import {
  AuthCredentialsValidator,
  AuthSignInValidator,
  TAuthCredentialsValidator,
  TAuthSignInValidator,
} from "@/lib/validators/account-credentials-validator";
import { trpc } from "@/trpc/client";
import { toast } from "@/components/ui/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { sendWelcomeUserEmail } from "@/actions/sendWelcomeUserEmail";
import { sendWelcomeVendorEmail } from "@/actions/sendWelcomeVendorEmail";

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const origin = searchParams.get("origin");

  const [email2, setEmail2] = useState("");

  function handleEmailChange(event: {
    target: { value: React.SetStateAction<string> };
  }) {
    setEmail2(event.target.value);
  }

  const role = trpc.sendWelcomeUserEmail.useQuery({
    email: email2,
  });

  const updUserFirstLog = trpc.updateUserFirstLog.useMutation();
  const updVendorFirstLog = trpc.updateVendorFirstLog.useMutation();

  const createAccIfNil = trpc.createPlanIfNil.useMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthSignInValidator>({
    resolver: zodResolver(AuthSignInValidator),
  });

  const { mutate: signIn, isLoading } = trpc.auth.signIn.useMutation({
    onSuccess: async () => {
      toast({
        title: "Welcome back, go on ahead champ!",
        description: "Log in was successful",
      });

      router.refresh();

      if (origin) {
        router.push(`${process.env.NEXT_PUBLIC_SERVER_URL}/${origin}`);
        router.refresh();
        return;
      }

      router.push("/");
      router.refresh();
    },
    onError: (err) => {
      console.log(JSON.stringify(err));
      if (err.data?.code === "UNAUTHORIZED") {
        toast({
          title: "Oh shoot! Looks like something went wrong.",
          description: "Invalid Email or Password",
          variant: "destructive",
        });
      }
    },
  });

  const onSubmit = ({ email, password }: TAuthSignInValidator) => {
    if (
      role.data &&
      role.data.totalDocs != 0 &&
      role.data.docs[0].userFirstLog === true &&
      role.data.docs[0]._verified === true
    ) {
      sendWelcomeUserEmail({
        email: email,
        name: role.data.docs[0].name,
      });
      updUserFirstLog.mutate({
        email: email,
      });
    }

    if (
      role.data &&
      role.data.totalDocs != 0 &&
      role.data.docs[0].vendorFirstLog === true
    ) {
      sendWelcomeVendorEmail({
        email: email,
      });
      updVendorFirstLog.mutate({
        email: email,
      });
    }

    if (role.data && role.data.totalDocs != 0) {
      createAccIfNil.mutate({
        userId: role.data.docs[0].id,
      });
    }

    signIn({ email, password });
  };

  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Link href="/">
              <Image
                unoptimized={true}
                width={20}
                height={20}
                src="/logopng.png"
                alt="logo"
                className="w-20 h-20"
              />
            </Link>
            <h1 className="text-2xl font-semibold tracking-tight">
              Sign in to your account
            </h1>

            <Link
              className={buttonVariants({
                variant: "link",
                className: "gap-1.5",
              })}
              href="/sign-up"
            >
              Don&apos;t have an account?
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="false">
              <div className="grid gap-2">
                <div className="grid gap-1 py-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...register("email")}
                    className={cn({
                      "focus-visible:ring-red-500": errors.email,
                    })}
                    placeholder="you@example.com"
                    onChange={handleEmailChange}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        //handleSubmit(onSubmit);
                      }
                    }}
                  />
                  {errors?.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-1 py-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    {...register("password")}
                    type="password"
                    className={cn({
                      "focus-visible:ring-red-500": errors.password,
                    })}
                    placeholder="Password"
                  />
                  {errors?.password && (
                    <p className="text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col justify-center">
                  <Button disabled={isLoading}>
                    {isLoading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Sign in
                  </Button>
                  <Link
                    href={"/backstage/forgot"}
                    className={buttonVariants({
                      variant: "link",
                      className: "text-xs",
                    })}
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
