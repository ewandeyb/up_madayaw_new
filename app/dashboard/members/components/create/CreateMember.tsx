import { Button } from "@/components/ui/button";
import React from "react";
import DialogForm from "../DialogForm";
import CreateForm from "./CreateForm";

export default function CreateMember() {
	return (
		<DialogForm
			id="create-trigger"
			title="Create Member"
			Trigger={<Button variant="outline">Create</Button>}
			form={<CreateForm />}
		/>
	);
}
