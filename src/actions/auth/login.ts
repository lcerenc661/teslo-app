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
      redirect: false,
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

export const login = async (email: string, password: string) => {
  try {
    await signIn("credentials", { email, password });

    return { ok: true };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Failed to login",
    };
  }
};
