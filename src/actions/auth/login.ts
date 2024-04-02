"use server";

import { signIn } from "@/auth.config";
import { sleep } from "@/utils";
import { AuthError } from "next-auth";

// ...

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    // sleep(4)
    await signIn("credentials", {
      redirect: true,
      ...Object.fromEntries(formData),
    });

    return "Success";
  } catch (error) {
    // if (error instanceof AuthError) {
    //   switch (error.type) {
    //     case "CredentialsSignin":
    //       return "Invalid credentials.";
    //     default:
    //       return "Something went wrong.";
    //   }
    // }
    // throw error;

    if ((error as any).type === "CredentialsSignin") {
      return "CredentialsSignin";
    }

    return "Somethig went wrong";
  }
}
