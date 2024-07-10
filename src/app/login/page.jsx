"use client";
import { Button, Input } from "@nextui-org/react";
import React from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

const page = () => {
  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      console.log(res);
    } catch (error) {
      console.error("Sign in error:", error);
    }
  };
  return (
    <div>
      <h2 className="text-center font-bold">Please Login</h2>
      <form
        onSubmit={handleLogin}
        className="flex max-w-md justify-center mx-auto mt-4 border p-6 border-primary flex-col md:flex-nowrap gap-4"
      >
        <Input name="email" type="email" label="Email" />
        <Input name="password" type="password" label="Password" />
        <Button color="primary" className="font-bold text-white" type="submit">
          Login
        </Button>
        <span>
          Don&apos;t have an account? <Link href={"/signUp"}>Sign Up</Link>
        </span>
      </form>
    </div>
  );
};

export default page;
