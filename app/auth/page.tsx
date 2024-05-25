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
      <div className="flex justify-center m-auto h-screen p-4">
        <AuthForm />
      </div>
    </>
  );
}
