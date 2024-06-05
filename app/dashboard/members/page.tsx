import { columns } from "./columns";
import { DataTable } from "./data-table";
import { createSupbaseServerClient } from "@/lib/supabase";
import { IPermission } from "@/lib/types";
import { readUserSession } from "@/lib/actions";
import Link from "next/link";
async function getApplicationData(): Promise<IPermission[]> {
  const supabase = await createSupbaseServerClient();

  try {
    // Fetch data from the 'permissions' table with a join on 'MemberData'
    const { data, error } = await supabase
      .from("Permissions")
      .select(`*, MemberData (*)`); // Select all columns and nested MemberData

    if (error) {
      throw error; // Handle errors appropriately
    }

    return data as IPermission[]; // Type cast to your interface for type safety
  } catch (error) {
    console.error("Error fetching application data:", error);
    // Handle errors gracefully (e.g., display a generic error message)
    return []; // Return an empty array to prevent rendering issues
  }
}

const DemoPage = () => {
  const fetchData = async () => {
    try {
      const data = await getApplicationData();
      const { data: userSession } = await readUserSession();
      const isAdmin = userSession.session?.user.user_metadata.Role === "admin";

      if (isAdmin) {
        // Render the DataTable if the user is admin
        return (
          <div className="overflow-y-auto space-y-5 w-full ">
            <h1 className="text-3xl font-bold">Members</h1>
            <DataTable columns={columns} data={data} />
          </div>
        );
      } else {
        return (
          <div className="flex h-[100dvh] w-full flex-col my-auto dark:bg-gray-800">
            <div className="space-y-4 text-center my-auto m-40">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
                Unauthorized Access
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                You do not have permission to access this resource.
              </p>
            </div>
          </div>
        );
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle errors gracefully (e.g., display a generic error message)
      return null; // Return null to prevent rendering anything in case of error
    }
  };

  // Call fetchData to render the appropriate content
  return fetchData();
};

export default DemoPage;
