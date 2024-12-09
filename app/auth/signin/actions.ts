"use server";

import { v4 as uuidv4 } from "uuid";
import { formSchema } from "./utils";
import { kv } from '@/lib/kv'

export async function signIn(account: string, password: string) {
  try {
    const validatedFields = formSchema.safeParse({ account, password });
    if (!validatedFields.success) {
      return { success: false, message: validatedFields.error.message };
    }

    const isAuthenticated = await authenticateWithPassport(account, password);

    if (!isAuthenticated) {
      return { success: false, message: "Invalid account or password" };
    }

    const ticket = uuidv4();
    await kv.set(`auth:${ticket}`, { account }, { ex: 60 * 5 }); // 5 minutes

    return { success: true, ticket };
  } catch (error) {
    console.error('Sign-in error:', error);
    return { success: false, message: "Internal server error" };
  }
}

export async function authenticateWithPassport(account: string, password: string) {
  await new Promise(resolve => setTimeout(resolve, 1500))

  return account === "19900000000" && password === "123";
}
