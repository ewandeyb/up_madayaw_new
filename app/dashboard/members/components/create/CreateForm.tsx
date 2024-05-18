"use client";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { createMember} from "../../actions";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";
import {MemberSchema} from "./schema"
import {MemberFields} from "./types"
import { useTransition } from "react";

export default function MemberForm() {

	const [isPending,startTransition] = useTransition();
	const Roles = ["admin", "user"];
	const MemberType = ["Regular Membership", "Associate (NGS/Project-Based)"]
	const Status = ["active","resigned"]

	const form = useForm<MemberFields>({
		resolver: zodResolver(MemberSchema),
		defaultValues: {
			/* MembershipNo: "1",
			MemberType: "Regular Membership",
			MiddleName: "Hue",
			LastName: "Doe",
			Suffix: "Jr.",
			Sex: "Male",
			BirthDate: "2024/05/06",
			Birthplace: "Davao",
			SpouseFirstName: "Jane",
			SpouseMiddleName: "Go",
			SpouseLastName: "Tan",
			SpouseSuffix: "Sr.",
			SpouseOccupation: "Teacher",
			NearestRelativeFirstName: "Johnny",
			NearestRelativeLastName: "Du", */
			FirstName: "John",
			Email: "upmadayaw@up.edu.ph",
			Role: "user",
			Status: "active",
		},
	});

	function onSubmit(data:MemberFields) {

		startTransition(async () =>{
			const result = await createMember(data);
			const {error} = JSON.parse(result || '{}');
			console.log();
			if(error?.message){
				toast({
					title: "Failed to create member",
					description: (
						<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
							<code className="text-white">
								{error.message}
							</code>
						</pre>
					),
				});
			}else{
				document.getElementById("create-trigger")?.click();
				toast({
					title: "Sucessfully created member",
				});
			}
		});
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-full space-y-6"
			>
				<FormField
					control={form.control}
					name="Email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									placeholder="email@gmail.com"
									type="email"
									{...field}
									onChange={field.onChange}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									placeholder="******"
									type="password"
									onChange={field.onChange}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="confirm"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm Password</FormLabel>
							<FormControl>
								<Input
									placeholder="******"
									type="password"
									onChange={field.onChange}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="FirstName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input
									placeholder="First Name"
									onChange={field.onChange}
								/>
							</FormControl>
							<FormDescription>
								This is your first name.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="Role"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Role</FormLabel>
							<Select
								onValueChange={field.onChange}
								defaultValue={field.value}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select a role" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{Roles.map((role, index) => {
										return (
											<SelectItem
												value={role}
												key={index}
											>
												{role}
											</SelectItem>
										);
									})}
								</SelectContent>
							</Select>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="Status"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Status</FormLabel>
							<Select
								onValueChange={field.onChange}
								defaultValue={field.value}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select user status" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{Status.map((status, index) => {
										return (
											<SelectItem
												value={status}
												key={index}
											>
												{status}
											</SelectItem>
										);
									})}
								</SelectContent>
							</Select>
							<FormDescription>
								status resign mean the user is no longer work
								here.
							</FormDescription>

							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					type="submit"
					className="w-full flex gap-2 items-center"
					variant="outline"
				>
					Submit{" "}
					<AiOutlineLoading3Quarters
						className={cn("animate-spin", { hidden: !isPending })}
					/>
				</Button>
			</form>
		</Form>
	);
}
