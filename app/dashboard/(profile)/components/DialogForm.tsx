import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import React, { ReactNode } from "react";

export default function DailogForm({
	Trigger,
	id,
	title,
	form,
}: {
	title: string;
	Trigger: ReactNode;
	id: string;
	form: ReactNode;
}) {
	return (
		<Dialog>
			<DialogTrigger asChild id={id}>
				{Trigger}
			</DialogTrigger>
			<DialogContent className="sm:max-w-[1200px] dark:bg-graident-dark">
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>
						Make change to profile here.
					</DialogDescription>
				</DialogHeader>
				{form}
			</DialogContent>
		</Dialog>
	);
}
