"use client";
import { createSupbaseServerClient } from "@/lib/supabase";
import { revalidatePath, unstable_noStore } from "next/cache";
import { createClient } from '@supabase/supabase-js';
import { getUser } from "@/utils/supabase/auth"; // Assuming you have an auth utility to get the logged-in user
import { useParams } from "next/navigation";

const supabase = await createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export async function updateUserPassword(pass_data: {
  PreviousPassword?: string,
  NewPassword: string,
  ConfirmPassword: string
}
) {

  unstable_noStore(); // Cache

  if (pass_data.NewPassword === pass_data.ConfirmPassword) {


    const params = useParams<{ code: string; }>()
    console.log(1)
    console.log(params.code)

    const { error, data } = await supabase.auth.exchangeCodeForSession(params.code!)

    console.log(2)
    // Fetch the currently logged-in user
    const user = await getUser(supabase);
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