"use client"
import CreateMember from "../members/components/create/CreateMember"
import {ColumnDef} from "@tanstack/react-table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export type Applications = {
  Role: "user" | "admin";
  Status: "accepted" | "rejected" | "pending" | "active";
  PermissionsID: string;
  MembershipID: string;
  FirstName: string;
  LastName: string;
  Email: string;
  MemberType: "Casual" | "NGS" | "Permanent";
};


export const columns: ColumnDef<Applications>[] = [
  {
    accessorKey: "MembershipID",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Membership ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  }
  ,
  {
    accessorKey: "FirstName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          First Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  }
  ,
  {
    accessorKey: "LastName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  }
  ,
  {
    accessorKey: "Email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  }
  ,
  {
    accessorKey: "MemberType",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Membership Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  }
  ,
  {
    accessorKey: "Role",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Role
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  }
  ,
  {
    accessorKey: "Status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  }
  ,
  {
    id: "actions",
    cell: ({ row }) => {
      const application = row.original
      
      return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={(event) => {
                  navigator.clipboard.writeText(application.MembershipID);
                }}
                className="pl-6"                
              >
                  Copy Application ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
              onClick={(event) => {
                event.preventDefault();
              }} 
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
              onClick={(event) => {
                event.preventDefault();
              }} 
              >
                Delete
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(event) => {
                  event.preventDefault();
                }}
                className="pl-6"  
              >View full application details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
      )
    },
  },
]
