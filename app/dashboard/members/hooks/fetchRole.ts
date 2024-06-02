"use server";
import { createSupbaseServerClient } from "@/lib/supabase";
export default async function fetchRole(): Promise<string> {
  const supabase = await createSupbaseServerClient();

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  if (error) {
    console.error("Error getting user session:", error);
    return error.message;
  }

  const user = session?.user;

  // Assuming the user's role is stored in user metadata
  // You might need to adjust this based on your actual user schema
  return user?.user_metadata?.Role;
}
