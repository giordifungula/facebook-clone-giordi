import Image from "next/image";
import React from "react";
import { signIn, signOut } from "next-auth/react";

export default function Login() {
  return (
    // login form with tailwinds styles
    <div className="grid place-items-center">
      <Image
        src="https://links.papareact.com/t4i"
        height={400}
        width={400}
        objectFit={"contain"}
      />
      <h1
        onClick={signIn}
        className="p-5 bg-blue-500 rounded-full text-white center cursor-pointer"
      >
        Login with Facebook
      </h1>
    </div>
  );
}
