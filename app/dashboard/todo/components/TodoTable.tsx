import React from "react";
import ListOfTodo from "./ListOfTodo";
import OldTable from "@/components/ui/OldTable";

export default function TodoTable() {
	const tableHeader = ["Title", "Status", "Created at", "Created by"];

	return (
		<OldTable headers={tableHeader}>
			<ListOfTodo />
		</OldTable>
	);
}
