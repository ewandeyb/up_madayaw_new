import { Button } from "@/components/ui/button";
import React from "react";
import { TrashIcon, Pencil1Icon } from "@radix-ui/react-icons";
import ListOfMembers from "./ListOfMembers";
import OldTable from "@/components/ui/OldTable";

export default function MemberTable() {
	const tableHeader = ["Name", "Role", "Joined", "Status"];

	return (
		<OldTable headers={tableHeader}>
			<ListOfMembers />
		</OldTable>
	);
}
