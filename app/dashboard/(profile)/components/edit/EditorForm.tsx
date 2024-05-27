import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonInfo from "./PersonInfo";
import ContactInfo from "./ContactInfo";
import MemDetails from "./MemDetails";
import EmploymentInfo from "./EmploymentInfo";
import LoanDetails from "./LoanDetails";
import { cn } from "@/lib/utils";

export default function EditForm() {
	return (
		<Tabs defaultValue="basic" className="w-full space-y-5">
			<TabsList className={cn("grid w-full ", "grid-cols-5")}>
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
				<PersonInfo />
			</TabsContent>
			<TabsContent value="contact">
				<ContactInfo />
			</TabsContent>
			<TabsContent value="membership">
				<MemDetails />
			</TabsContent>
		</Tabs>
	);
}
