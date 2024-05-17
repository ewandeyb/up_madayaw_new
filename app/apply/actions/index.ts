"use server";
import { readUserSession } from "@/lib/actions";
import { createSupabaseAdmin, createSupbaseServerClient } from "@/lib/supabase";
import { revalidatePath, unstable_noStore } from "next/cache";

export async function createApplication(data: {
  FirstName: string,
  MiddleName: string,
  LastName: string,
  Suffix: string,
  CivilStatus: string,
  Email: string,
  Sex: string
}) {

  const new_uuid = crypto.randomUUID();
  const supabase = await createSupbaseServerClient();
  // modification? may or may not work.
  const applicationResult = await supabase.from("MemberData").insert({
      MembershipID: new_uuid,
      MembershipNo: 69420,
      MemberType: "PENDING",
      FirstName: data.FirstName,
      MiddleName: data.MiddleName,
      LastName: data.LastName,
      Suffix: data.Suffix,
      CivilStatus: data.CivilStatus,
      Email: data.Email,
      Sex: data.Sex
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
