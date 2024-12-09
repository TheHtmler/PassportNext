import { z } from "zod";

export const formSchema = z.object({
  account: z.string({ required_error: "Account is required" }).regex(/^1[3-9]\d{9}$/, { message: "Invalid phone number" }), // phone number
  password: z.string({ required_error: "Password is required" }).min(1),
});

export const getTokenFromPassport = async (account: string) => {
  await new Promise(resolve => setTimeout(resolve, 1500))

  return `token_${account}`;
}

export const getUserFromPassport = async (token: string) => {
  await new Promise(resolve => setTimeout(resolve, 1500))

  if (!token.startsWith("token_")) {
    throw new Error("Invalid token");
  }

  return {
    id: 1,
    account: token.split("token_")[1],
    name: "John Doe"
  }
}