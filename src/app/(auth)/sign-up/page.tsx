"use client";

import Link from "next/link";
import Image from "next/image";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AuthCredentialsValidator,
  TAuthCredentialsValidator,
} from "@/lib/validators/account-credentials-validator";
import { trpc } from "@/trpc/client";
import { toast } from "@/components/ui/use-toast";
import { ZodError } from "zod";
import { useRouter } from "next/navigation";
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  });

  const [captcha, setCaptcha] = useState<string | null>();

  const router = useRouter();

  const { mutate, isLoading } = trpc.auth.createPayloadUser.useMutation({
    onError: (err) => {
      if (err.data?.code === "CONFLICT") {
        toast({
          title: "Sign in instead?",
          description: "We know this email already! Were you tryna sign in?",
          variant: "destructive",
        });

        return;
      }

      if (err instanceof ZodError) {
        toast({
          title: "Oh shoot! Looks like something went wrong.",
          description: err.issues[0].message,
          variant: "destructive",
        });

        return;
      }

      toast({
        title: "Oh shoot! Looks like something went wrong.",
        description: "Hmm. Try it again?",
        variant: "destructive",
      });
    },
    onSuccess: ({ sentToEmail }) => {
      toast({
        title: "I believe you got mail!",
        description: `Verification email sent to ${sentToEmail}`,
      });
      router.push("/verify-email?to=" + sentToEmail);
    },
  });

  const onSubmit = ({ email, password, name }: TAuthCredentialsValidator) => {
    if (captcha) {
      mutate({ email, password, name });
    }
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
              Create an account
            </h1>
          </div>

          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <div className="grid gap-1 py-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...register("email")}
                    className={cn({
                      "focus-visible:ring-red-500": errors.email,
                    })}
                    placeholder="you@example.com"
                  />
                  {errors?.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-1 py-2">
                  <Label htmlFor="email">Name</Label>
                  <Input {...register("name")} placeholder="Your Name" />
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

                <div className="w-full flex flex-row justify-center mb-2">
                  <ReCAPTCHA
                    sitekey={`${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
                    onChange={setCaptcha}
                  />
                </div>

                {captcha ? (
                  <Button>Sign up</Button>
                ) : (
                  <Button disabled>Sign up</Button>
                )}
              </div>
            </form>
            <p className="text-xs italic text-slate-600 text-balance text-center">
              By registering you are agreeing to receive updates and promotions
              from Sarang Sayang
            </p>
            <Link
              className={buttonVariants({
                variant: "link",
                className: "gap-1.5",
              })}
              href="/sign-in"
            >
              Already have an account? Sign in
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
