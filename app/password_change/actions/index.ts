import { revalidatePath, unstable_noStore } from "next/cache";
import { getUser } from "@/utils/supabase/auth"; // Assuming you have an auth utility to get the logged-in user
import { useParams } from "next/navigation";
import { access } from "fs";
import { createBrowserClient } from "@supabase/ssr"
import { createClient } from "@supabase/supabase-js";

// 

export async function updateUserPassword(access_code: string, pass_data: {
  PreviousPassword?: string,
  NewPassword: string,
  ConfirmPassword: string
}
) {
  unstable_noStore(); // Cache

  if (pass_data.NewPassword === pass_data.ConfirmPassword) {
    console.log("osijasoijfaoipdfj[aodisjfasd")
    const supabase_url = "https://hudheaqnruaponeloslj.supabase.co"
    const anon_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1ZGhlYXFucnVhcG9uZWxvc2xqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ4MDM0MTQsImV4cCI6MjAzMDM3OTQxNH0.k1V6fGk48AiZWeoeAqkqC0MZEjcUxyjOv2eqxwhd48A"
    const supabase = await createBrowserClient(supabase_url, anon_key)

    const { data, error } = await supabase.auth.exchangeCodeForSession(access_code);
    // Fetch the currently logged-in user
    const user = await getUser(supabase);
    console.log(user);

    const updatePassword = await supabase.auth.updateUser({
      password: pass_data.NewPassword,
    })

    if (updatePassword.error?.message) {
      console.log(3)
      console.log(JSON.stringify(updatePassword));
      return JSON.stringify(updatePassword);
    }

    revalidatePath("/auth");
    const result = await supabase.auth.signOut()
    return JSON.stringify(updatePassword);

  } else {
    return ("{\"error\": {\"message\": \"Passwords do not match.\"}}")
  }
}