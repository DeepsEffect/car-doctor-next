"use client";
import { Button, Input } from "@nextui-org/react";
import React from "react";

const page = () => {
  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const userInfo = {
      name,
      email,
      password,
    };
    console.log(userInfo);
  };
  return (
    <div>
      <h2 className="text-center font-bold">Please sign in</h2>
      <form
        onSubmit={handleSignIn}
        className="flex max-w-md justify-center mx-auto mt-4 border p-6 border-primary flex-col md:flex-nowrap gap-4"
      >
        <Input name="name" type="name" label="Name" />
        <Input name="email" type="email" label="Email" />
        <Input name="password" type="password" label="Password" />
        <Button color="primary" className="font-bold text-white" type="submit">
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default page;
