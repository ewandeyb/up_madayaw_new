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
import CreateMember from "../members/components/create/CreateMember";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { PageProps } from "../../../.next/types/app/(home)/page";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

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
        <div className="flex items-center py-4 ">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" className="max-w-20">
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
            <Button variant="secondary">
              <a href="/apply">Create New Application</a>
            </Button>
          </div>
          {/* OPTION 1 */}{" "}
          {/* <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">Columns</Button>
              </SheetTrigger>
              <SheetContent className="h-screen overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Edit Columns</SheetTitle>
                  <SheetDescription>
                    Make changes to the columns here. Click save when
                    you&apos;re done.
                  </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => (
                      <div key={column.id} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={column.getIsVisible()}
                          onChange={(e) =>
                            column.toggleVisibility(e.target.checked)
                          }
                        />
                        <label className="ml-2 capitalize">{column.id}</label>
                      </div>
                    ))}
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button type="button">Save changes</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet> */}
          {/* Option 2 */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" className="ml-auto">
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="max-h-40 overflow-auto">
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
      <div className="rounded-md border overflow-auto max-w-screen max-h-fit">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="">
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
                  className=""
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
        <p className="mr-auto ">Page of {table.getPageCount()}</p>
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
