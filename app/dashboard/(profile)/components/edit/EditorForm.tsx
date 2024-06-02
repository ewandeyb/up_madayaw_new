import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonInfo from "./PersonInfo";
import ContactInfo from "./ContactInfo";
import MemDetails from "./MemDetails";
import EmploymentInfo from "./EmploymentInfo";
import LoanDetails from "./LoanDetails";
import { cn } from "@/lib/utils";
import { IMemberData } from "@/lib/types";

export default function EditForm({
  MemberProfile,
}: {
  MemberProfile: IMemberData;
}) {
  return (
    <Tabs defaultValue="basic" className="w-full space-y-5">
      <TabsList className={cn("grid w-full ", "grid-cols-2")}>
        <TabsTrigger value="basic">Personal</TabsTrigger>
        {
          <>
            {/* <TabsTrigger value="contact">Contact</TabsTrigger> */}
            <TabsTrigger value="membership">Membership</TabsTrigger>
          </>
        }
      </TabsList>
      <TabsContent value="basic">
        <PersonInfo MemberProfile={MemberProfile} />
      </TabsContent>
      {/* <TabsContent value="contact">
				<ContactInfo MemberProfile={MemberProfile} />
			</TabsContent> */}
      <TabsContent value="membership">
        <MemDetails MemberProfile={MemberProfile} />
      </TabsContent>
    </Tabs>
  );
}
