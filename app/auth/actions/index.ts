"use server";

import { createSupbaseServerClient } from "@/lib/supabase";
import { redirect } from "next/navigation";

export async function loginWithEmailAndPassword(data: {
  email: string;
  password: string;
}) {
  const supabase = await createSupbaseServerClient();

  const result = await supabase.auth.signInWithPassword(data);
  return JSON.stringify(result);
}

export async function sendPasswordResetRequest(data: {
  email: string;
}) {
  const supabase = await createSupbaseServerClient();

  const result = await supabase.auth.resetPasswordForEmail(data.email, {
    redirectTo: 'localhost:3000/password_change',
  })

  return JSON.stringify(result)
}

export async function logout() {
  const supabase = await createSupbaseServerClient();

  try {
    await supabase.auth.signOut();
    redirect("/auth"); // Redirect to the authentication page after successful sign out
  } catch (error) {
    console.error("Error signing out:");
  }
}