import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonInfo from "./PersonInfo";
import ContactInfo from "./ContactInfo";
import MemDetails from "./MemDetails";
import EmploymentInfo from "./EmploymentInfo";
import LoanDetails from "./LoanDetails";
import { cn } from "@/lib/utils";
import { IMemberData } from "@/lib/types";

export default function EditForm({ MemberData2 }: { MemberData2: IMemberData }) {
	return (
		<Tabs defaultValue="basic" className="w-full space-y-5">
			<TabsList className={cn("grid w-full ", "xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2")}>
				<TabsTrigger value="basic">Personal Information</TabsTrigger>
				{(
					<>
						<TabsTrigger value="contact">Contact Information</TabsTrigger>
						<TabsTrigger value="membership">Membership Details</TabsTrigger>
						<TabsTrigger value="employment">Employment Information</TabsTrigger>
						<TabsTrigger value="loan">Loan Details</TabsTrigger>
					</>
				)}
			</TabsList>
			<TabsContent value="basic">
				<PersonInfo MemberData2={MemberData2} />
			</TabsContent>
			<TabsContent value="contact">
				<ContactInfo MemberData2={MemberData2} />
			</TabsContent>
			<TabsContent value="membership">
				<MemDetails MemberData2={MemberData2} />
			</TabsContent>
		</Tabs>
	);
}
