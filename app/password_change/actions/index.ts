"use server";
import { createSupbaseServerClient } from "@/lib/supabase";
import { revalidatePath, unstable_noStore } from "next/cache";
import { createClient } from '@supabase/supabase-js';
import { getUser } from "@/utils/supabase/auth"; // Assuming you have an auth utility to get the logged-in user

const supabase = createClient('https://hudheaqnruaponeloslj.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1ZGhlYXFucnVhcG9uZWxvc2xqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ4MDM0MTQsImV4cCI6MjAzMDM3OTQxNH0.k1V6fGk48AiZWeoeAqkqC0MZEjcUxyjOv2eqxwhd48A');

export async function updateUserPassword(pass_data: {
  PreviousPassword?: string,
  NewPassword: string,
  ConfirmPassword: string
}
) {

  unstable_noStore(); // Cache

  if (pass_data.NewPassword === pass_data.ConfirmPassword) {

    const supabase = await createSupbaseServerClient()

    // Fetch the currently logged-in user
    const user = await getUser(supabase);
    const updatePassword = await supabase.auth.updateUser({
      password: pass_data.NewPassword,
    })

    if (updatePassword.error?.message) {
      console.log(JSON.stringify(updatePassword));
      return JSON.stringify(updatePassword);
    }

    revalidatePath("/auth");
    const { error } = await supabase.auth.signOut()
    return JSON.stringify(updatePassword);

  } else {
    return ("{\"error\": {\"message\": \"Passwords do not match.\"}}")
  }
}