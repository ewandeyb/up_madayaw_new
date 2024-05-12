"use server";
import { readUserSession } from "@/lib/actions";
import { createSupabaseAdmin, createSupbaseServerClient } from "@/lib/supabase";
import { revalidatePath, unstable_noStore } from "next/cache";

export async function createMember(data: {
  name: string;
  role: "user" | "admin";
  status: "active" | "resigned";
  email: string;
  password: string;
  confirm: string;
}) {
  //Prevent User from accessing admin stuff
  const { data: userSession } = await readUserSession();
  if (userSession.session?.user.user_metadata.role !== "admin") {
    return JSON.stringify({
      error: { message: "You are not allowed to access this!" },
    });
  }

  const supabase = await createSupabaseAdmin();
  // create account

  const createResult = await supabase.auth.admin.createUser({
    email: data.email,
    password: data.password,
    email_confirm: true,
    user_metadata: {
      role: data.role,
    },
  });

  if (createResult.error?.message) {
    return JSON.stringify(createResult);
  } else {
    const memberResult = await supabase
      .from("members")
      .insert({ name: data.name, id: createResult.data.user?.id, email:data.email });
    if (memberResult.error?.message) {
      return JSON.stringify(memberResult);
    } else {
      const permissionResult = await supabase.from("permissions").insert({
        role: data.role,
        member_id: createResult.data.user?.id,
        status: data.status,
      });
			revalidatePath("/dashboard/member");
      return JSON.stringify(permissionResult);
    }
  }

  // Create Member
  // create permission
  console.log("create user");
}
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

export async function deleteMemberById(user_id: string) {
	
	const { data: userSession } = await readUserSession();
  if (userSession.session?.user.user_metadata.role !== "admin") { // if not admin, not allowed
    return JSON.stringify({
      error: { message: "You are not allowed to access this!" },
    });
  } 

	// delete account
	const supabaseAdmin = await createSupabaseAdmin();

	const deleteResult = await supabaseAdmin.auth.admin.deleteUser(user_id);

	if (deleteResult.error?.message) {
    return JSON.stringify(deleteResult);
  }else{
		const supbase = await createSupbaseServerClient()

		const result =  await supbase.from("members").delete().eq("id", user_id);
		revalidatePath("/dashboard/member");
		return JSON.stringify(result);
	}
}

export async function readMembers() {

	unstable_noStore(); //Cache

	const supbase = await createSupbaseServerClient()

	return await supbase.from("permissions").select("*,members(*)");
}
