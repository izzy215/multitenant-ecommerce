"use client"
import { z } from "zod";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { registerSchema } from "../../schemas";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
})

export const SignUpView = () => {
  const trpc = useTRPC();
  const register = useMutation(trpc.auth.register.mutationOptions());

  const form = useForm<z.infer<typeof registerSchema>>({
    mode: "all",
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    console.log(values)
  }

  const username = form.watch("username");
  const usernameErrors = form.formState.errors.username;

  const showPreview = username && !usernameErrors;

  return (
    <div className="grid grid-cols-l lg:grid-cols-5">
      <div className="bg-[#F4F4F4] h-screen w-full lg:col-span-3 overflow-y-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-8 p-4 lg:p-16"
          >
            <div className="flex items-center justify-between mb-8">
              <Link href="/">
              <span className={cn("text-2xl font-semibold", poppins)}>
                funroad
                </span>
              </Link>
              <Button 
                asChild
                variant="ghost"
                size="sm"
                className="text-base border-none underline"
                >
                <Link prefetch href="/sign-in">
                Sign in
                </Link>
              </Button>
            </div>
            <h1 className="text-4xl font-medium">
              Join over 1000 creators earning money on Funroad
            </h1>
            <FormField 
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription
                    className={cn("hidden", showPreview && "block")}
                    >
                      Your store will be available at &nbsp;
                      {/* Todo : proper url generate menthod */}
                      <strong>{username}</strong>.shop.com

                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              size="lg"
              variant="elevated"
              className="bg-black text-white hover:bg-pink-400 hover:text-primary"
            >
              Create account
            </Button>
          </form>
          
        </Form>
      </div>
      <div 
        className="h-screen w-full lg:col-span-2 hidden lg:block"
        style={{
          backgroundImage:"url('/auth-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
        >
        Background column
      </div>
    </div>
  )
}

function useMutation(arg0: any) {
  throw new Error("Function not implemented.");
}
