 "use client";

import { authenticate } from "@/actions";
import clsx from "clsx";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { IoInformationOutline } from "react-icons/io5";

export const LoginForm = () => {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  // const router = useRouter();

  useEffect(() => {
    if (errorMessage === "Success") {
      // router.push("/");
      window.location.replace('/');
    }
  }, [errorMessage]);

  return (
    <>
      <form action={dispatch} className="flex flex-col">
        <label htmlFor="email">Email</label>
        <input
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="email"
          name="email"
        />

        <label htmlFor="password">Password</label>
        <input
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="password"
          name="password"
        />

        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true">
          {errorMessage === "CredentialsSignin" && (
            <div className="flex mb-2 justify-center">
              <IoInformationOutline className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500"> Invalid credentials</p>
            </div>
          )}
        </div>

        <LoginButton />
        {/* 
        <button type="submit" className="btn-primary">
          Login
        </button> */}

        {/* divisor l ine */}
        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800">O</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>

        <Link href="/auth/new-account" className="btn-secondary text-center">
          Create new account
        </Link>
      </form>
    </>
  );
};

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={clsx({
        "btn-primary": !pending,
        "btn-disable": pending,
      })}>
      Login
    </button>
  );
}
