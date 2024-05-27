"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import CreateMember from "./components/create/CreateMember";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
interface TData {
  PermissionsID: string;
  created_at: string;
  Role: "user" | "admin";
  Status: "active" | "resigned";
  MemberData: {
    MembershipID: string;
    FirstName: string;
    LastName: string;
    Email: string;
    MemberType: string;
  };
}
interface DataTableProps<TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const router = useRouter();
  const [selectedColumn, setSelectedColumn] = useState(null);

  const handleColumnSelect = (column: any) => {
    setSelectedColumn(column);
  };
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <div>
      <div>
        <div className="flex items-center py-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" className="max-w-24 mr-2">
                Filter by {selectedColumn}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="max-h-40 overflow-auto">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuItem
                      key={column.id}
                      className="capitalize"
                      onClick={() => handleColumnSelect(column.id)}
                    >
                      {column.id}
                    </DropdownMenuItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <Input
            placeholder="Filter here"
            value={
              selectedColumn
                ? (table
                    .getColumn(selectedColumn)
                    ?.getFilterValue() as typeof selectedColumn) ?? ""
                : ""
            }
            onChange={(event) =>
              selectedColumn &&
              table
                .getColumn(selectedColumn)
                ?.setFilterValue(event.target.value)
            }
            className="max-w-sm "
          />
          <div className="ml-2">
            <CreateMember />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" className="ml-auto">
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="bg-upcolor text-white dark:bg-slate-600 dark:text-white dark:font-bold"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="text-center"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="text-center text-sm dark:text-white dark:bg-black "
                      onClick={() => {
                        let shouldNavigate = true;
                        if (cell.column.id === "actions") {
                          shouldNavigate = false;
                        }
                        if (shouldNavigate) {
                          const membershipId =
                            row.original.MemberData.MembershipID;
                          console.log(membershipId);
                          router.push(`members/${membershipId}`);
                        }
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div></div>
      <div className="flex items-center justify-end space-x-2 py-5">
        <p className="mr-auto text-sm">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}{" "}
        </p>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => table.setPageIndex(0)}
        >
          First Page
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          Last Page
        </Button>
      </div>
    </div>
  );
}
