import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import React, { ReactNode } from "react";

export default function DialogForm({
	Trigger,
	id,
	title,
	form,
	description,
}: {
	title: string;
	Trigger: ReactNode;
	id: string;
	form: ReactNode;
	description: string;
}) {
	return (
		<Dialog>
			<DialogTrigger asChild id={id}>
				{Trigger}
			</DialogTrigger>
			<DialogContent className="sm:max-w-[525px] dark:bg-graident-dark">
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>
						{description}
					</DialogDescription>
				</DialogHeader>
				{form}
			</DialogContent>
		</Dialog>
	);
}
