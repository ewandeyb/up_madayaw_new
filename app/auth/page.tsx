import React from "react";
import AuthForm from "./components/AuthForm";
import { readUserSession } from "@/lib/actions";
import { redirect } from "next/navigation";
import Header from "@/components/Header";

export default async function page() {
  const { data: userSession } = await readUserSession();

  if (userSession.session) {
    return redirect("/dashboard");
  }
  return (
    <>
      {/* <Header /> */}
      <div className="flex justify-center h-screen p-4 bg-gradient-to-r from-[#FFFFFF] to-[#8E8E8E] dark:bg-gradient-to-r dark:from-[#B2B2B2] dark:to-[#202020] ml-auto">
        <AuthForm />
      </div>
    </>
  );
}
