import React, { ReactNode } from "react";

export default function OldTable({
	children,
	headers,
}: {
	children: ReactNode;
	headers: string[];
}) {
	return (
		<div className="rounded-md  border-zinc-200 dark:border-zinc-800  w-full overflow-y-auto border  dark:bg-graident-dark">
			<div className="w-[900px] lg:w-full bg-white dark:bg-black rounded-md space-y-5 py-5">
				<div className=" grid grid-cols-5 px-5 py-2  border-b pb-5 dark:border-zinc-600">
					{headers.map((header, index) => {
						return (
							<h1
								key={index}
								className="font-medium text-sm dark:text-white"
							>
								{header}
							</h1>
						);
					})}
				</div>

				{children}
			</div>
		</div>
	);
}
