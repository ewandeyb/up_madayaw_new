import { Applications, columns } from "./columns";
import { DataTable } from "./data-table";
import { createSupbaseServerClient } from "@/lib/supabase";

async function getApplicationData(): Promise<Applications[]> {
  const supabase = await createSupbaseServerClient();

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
      MembershipID: matchingMember?.MembershipID || '',
      FirstName: matchingMember?.FirstName || '',
      LastName: matchingMember?.LastName || '',
      Email: matchingMember?.Email || '',
      MemberType: matchingMember?.MemberType || '',
      Role: permission.Role,
      Status: permission.Status,
      PermissionsID: permission.PermissionsID
    };
  });

  console.log('Applications:', joinedData);
  return joinedData;
}

const DemoPage = async () => {
  const data = await getApplicationData();

  return (
    <div className=" overflow-y-auto space-y-5 w-full">
      <h1 className="text-3xl font-bold">Member Applications</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default DemoPage;
