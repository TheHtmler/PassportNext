"use client";

import { use, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import {
  Form,
  FormMessage,
  FormControl,
  FormLabel,
  FormItem,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn } from "./actions";
import { formSchema } from "./utils";

type SearchParams = Promise<{
  redirectUrl?: string;
}>;

export default function SignIn({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const router = useRouter();
  const { redirectUrl } = use(searchParams);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      account: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    startTransition(async () => {
      try {
        const { success, ticket, message } = await signIn(
          data.account,
          data.password
        );
        if (success) {
          router.push(`${redirectUrl}?ticket=${ticket}`);
        } else {
          form.setError("account", { message });
          form.setError("password", { message });
        }
      } catch (error) {
        console.log(error)
      }
    });
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full gap-20">
      {/* Title & Slogan */}
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-3xl font-bold">Auth Center</h1>
        <p className="text-sm text-gray-500">
          Secure authentication for multiple frontend sites
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full max-w-md"
        >
          <FormField
            control={form.control}
            name="account"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account</FormLabel>
                <FormControl>
                  <Input placeholder="Please enter your account" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Please enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
