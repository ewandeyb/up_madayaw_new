"use client"
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

//Need for forms
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApplicationFormSchema } from "./schema";
import { ApplicationFormFields } from "./types";
import { useForm} from "react-hook-form";
import { useTransition } from "react";
import { Input } from "@/components/ui/input";
import { createApplication } from "../actions"

export default function ApplicationForm(){
  const [isPending,startTransition] = useTransition();
  const CivilStatus = ["Single","Married","Divorced","Widowed","Annulled","Legally Seperated"];
  const Sex = ["Male","Female","Other","Prefer not to Say"]
  const form = useForm<ApplicationFormFields>({
		resolver: zodResolver(ApplicationFormSchema),
		defaultValues: {
			FirstName: "",
      MiddleName: "",
      LastName: "",
      Suffix: "",
      CivilStatus: "Single",
      PositionTitle: "",
      Email: "",
      Sex : "Male",
		},
  });

  function onSubmit(data:ApplicationFormFields){
    startTransition(async () =>{
			const result = await createApplication(data);
			const {error} = JSON.parse(result);
			if(error?.message){
				toast({
					title: "Failed to create application",
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
					title: "Sucessfully created and submitted application!",
				});
			}
		});
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid md:grid-cols-3 gap-2 p-2"
        >
          <FormField 
            control = {form.control}
            name="FirstName"
            render={({field}) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Aaron Dave" 
                    type="text"
                    {...field}
                    onChange={field.onChange} />
                </FormControl>
                <FormDescription>
                  This is your first name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField 
            control = {form.control}
            name="LastName"
            render={({field}) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input 
                  placeholder="Sia" 
                  type="text"
                  {...field}
                  onChange={field.onChange} />
                </FormControl>
                <FormDescription>
                  This is your last name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField 
            control = {form.control}
            name="MiddleName"
            render={({field}) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Acuna" 
                    type="text"
                    {...field}
                    onChange={field.onChange} />
                </FormControl>
                <FormDescription>
                  This is your middle name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField 
            control = {form.control}
            name="Suffix"
            render={({field}) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="A."
                    type="text"
                    {...field}
                    onChange={field.onChange} />
                </FormControl>
                <FormDescription>
                  This is your suffix.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField 
            control = {form.control}
            name="CivilStatus"
            render={({field}) => (
              <FormItem className="w-1/2">
                <FormLabel>Civil Status</FormLabel>
                <Select
								onValueChange={field.onChange}
								defaultValue={field.value}
							>
                <FormControl>
                  <SelectTrigger>
										<SelectValue placeholder="Select Civil Status" />
									</SelectTrigger>
                </FormControl>
                <SelectContent>
									{CivilStatus.map((CivilStatus, index) => {
										return (
											<SelectItem
												value={CivilStatus}
												key={index}
											>
												{CivilStatus}
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
            control = {form.control}
            name="PositionTitle"
            render={({field}) => (
              <FormItem>
                <FormLabel>Position Title</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="A."
                    type="text"
                    {...field}
                    onChange={field.onChange} />
                </FormControl>
                <FormDescription>
                  This is your posiiton title.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField 
            control = {form.control}
            name="Email"
            render={({field}) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="A."
                    type="email"
                    {...field}
                    onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField 
            control = {form.control}
            name="Sex"
            render={({field}) => (
              <FormItem className="w-1/2">
                <FormLabel>Sex</FormLabel>
                <Select
								onValueChange={field.onChange}
								defaultValue={field.value}
							>
                <FormControl>
                  <SelectTrigger>
										<SelectValue placeholder="Select Sex" />
									</SelectTrigger>
                </FormControl>
                <SelectContent>
									{Sex.map((Sex, index) => {
										return (
											<SelectItem
												value={Sex}
												key={index}
											>
												{Sex}
											</SelectItem>
										);
									})}
								</SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center col-span-3">
            <Button variant= "up" type="submit">Submit</Button>
          </div>
      </form>
    </Form>
  )
  
}