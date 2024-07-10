"use client";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

const page = () => {
  const handleSignUp = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const newUser = {
      name,
      email,
      password,
    };

    try {
      const res = await fetch("http://localhost:3000/signUp/api", {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          `HTTP error! Status: ${res.status}, Message: ${errorData.message}`
        );
      }

      const data = await res.json();
      // console.log(data);
      alert("signed up successfully");
      form.reset();
    } catch (error) {
      console.error("Error:", error);
      // Display user-friendly message
      alert(error.message);
    }
  };

  return (
    <div>
      <h2 className="text-center font-bold">Please sign Up</h2>
      <form
        onSubmit={handleSignUp}
        className="flex max-w-md justify-center mx-auto mt-4 border p-6 border-primary flex-col md:flex-nowrap gap-4"
      >
        <Input name="name" type="name" label="Name" />
        <Input name="email" type="email" label="Email" />
        <Input name="password" type="password" label="Password" />
        <Button color="primary" className="font-bold text-white" type="submit">
          Sign Up
        </Button>
        <span>
          Already have an account? <Link href={"/login"}>Login</Link>
        </span>
      </form>
    </div>
  );
};

export default page;
