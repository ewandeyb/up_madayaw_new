import { readUserSession } from "@/lib/actions";
import { Applications, columns } from "./columns"
import { DataTable } from "./data-table"
import { createSupabaseAdmin, createSupbaseServerClient } from "@/lib/supabase";
import { revalidatePath, unstable_noStore } from "next/cache";

async function getApplicationData(): Promise<Applications[]> {
  
  const supabase = await createSupabaseAdmin();
  const { data: permissions, error: permissionsError } = await supabase
  .from('Permissions')
  .select(`
    "Role",
    "Status",
    "PermissionsID"
  `);

if (permissionsError) {
  console.error('Error fetching permissions data:', permissionsError.message);
  return [];
}

const { data: memberData, error: memberDataError } = await supabase
  .from('MemberData')
  .select(`
    "MembershipID",
    "FirstName",
    "LastName",
    "Email",
    "MemberType"
  `);

if (memberDataError) {
  console.error('Error fetching member data:', memberDataError.message);
  return [];
}

// Perform the join programmatically
const joinedData = permissions.map(permission => {
  const matchingMember = memberData.find(member => member.MembershipID === permission.PermissionsID);
  return {
    ...permission,
    ...matchingMember
  };
});

console.log('Applications:', joinedData);
revalidatePath("/dashboard/mem_applications")
return joinedData;
}

export default async function DemoPage() {
  const data = await getApplicationData()
  
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
