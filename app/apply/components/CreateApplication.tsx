import { Button } from "@/components/ui/button";
import React from "react";
import DialogForm from "../../dashboard/members/components/DialogForm";
import CreateApplicationForm from "./CreateApplicationForm";

export default function CreateApplication() {
	return (
		<DialogForm
			id="create-trigger"
			title="Create Application Form"
			Trigger={<Button variant="outline">Create</Button>}
			form={<CreateApplicationForm />}
		/>
	);
}
