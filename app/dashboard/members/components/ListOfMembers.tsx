import React from "react";
import { Button } from "@/components/ui/button";
import EditMember from "./edit/EditMember";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { readMembers } from "../actions";
import { useUserStore } from "@/lib/store/user";
import { IPermission } from "@/lib/types";
import DeleteMember from "./DeleteMember";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function ListOfMembers() {
  const { data: Permissions } = await readMembers();

  const user = useUserStore.getState().user;
  const isAdmin = user?.user_metadata.Role === "admin";

  return (
    <div className="dark:bg-inherit bg-white mx-2 rounded-sm">
      {(Permissions as IPermission[])?.map((permission, index) => {
        return (
          <div
            className=" grid grid-cols-5  rounded-sm  p-3 align-middle font-normal"
            key={index}
          >
            <h1>{permission.MemberData.FirstName}</h1>

            <div className="items-center justify-center">
              <span
                className={cn(
                  " dark:bg-zinc-800 px-2 py-1 rounded-full shadow capitalize  border-[.5px] text-sm",
                  {
                    "border-green-500 text-green-600 bg-green-200":
                      permission.Role === "admin",
                    "border-zinc-300 dark:text-yellow-300 dark:border-yellow-700 px-4 bg-yellow-50":
                      permission.Role === "user",
                  }
                )}
              >
                {permission.Role}
              </span>
            </div>
            <h1>{new Date(permission.created_at).toDateString()}</h1>
            <div>
              <span
                className={cn(
                  " dark:bg-zinc-800 px-2 py-1 rounded-full  capitalize text-sm border-zinc-300  border",
                  {
                    "text-green-600 px-4 dark:border-green-400 bg-green-200":
                      permission.Status === "active",
                    "text-red-500 bg-red-100 dark:text-red-300 dark:border-red-400":
                      permission.Status === "resigned",
                  }
                )}
              >
                {permission.Status}
              </span>
            </div>

            <div className="flex gap-2 items-center">
              {isAdmin && (
                <>
                  <DeleteMember user_id={permission.MemberData.MembershipID} />
                </>
              )}
              <EditMember isAdmin={isAdmin} permission={permission} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
