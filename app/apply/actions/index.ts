"use server";
import { readUserSession } from "@/lib/actions";
import { createSupabaseAdmin, createSupbaseServerClient } from "@/lib/supabase";
import { revalidatePath, unstable_noStore } from "next/cache";

export async function createApplication(data: {
  FirstName: string,
  MiddleName: string,
  LastName: string,
  Suffix: string,
}) {
  
  const supabase = await createSupbaseServerClient();
  const applicationResult = await supabase.from("applications").insert({
    FirstName: data.FirstName,
    LastName: data.LastName,
    MiddleName: data.MiddleName,
    Suffix: data.Suffix,
  });

  if (applicationResult.error?.message) {
    return JSON.stringify(applicationResult);
  } else {
			revalidatePath("/apply");
      return JSON.stringify(applicationResult);
    }
  }

/* CODE BELOW NOT UPDATED */
export async function updateMemberBasicById(
	id: string, 
	data: {
		name: string;
	}
) {

	const supabase = await createSupbaseServerClient();

	const result = await supabase.from("members").update(data).eq("id", id)
	revalidatePath("/dashboard/members")
	return JSON.stringify(result)

}

export async function readMembers() {

	unstable_noStore(); //Cache

	const supbase = await createSupbaseServerClient()

	return await supbase.from("permissions").select("*,members(*)");
}
