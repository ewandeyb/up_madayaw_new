"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
ColumnDef,
ColumnFiltersState,
SortingState,
flexRender,
getCoreRowModel,
getFilteredRowModel,
getPaginationRowModel,
getSortedRowModel,
useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table"
import CreateMember from "../members/components/create/CreateMember"

interface DataTableProps<TData, TValue> {
columns: ColumnDef<TData, TValue>[]
data: TData[]
}

export function DataTable<TData,TValue>({
  columns,
  data,
}: DataTableProps<TData,TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  return (
    <div>
      <div>
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter emails..."
            value={(table.getColumn("Email")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("Email")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <div className="ml-auto">
            <CreateMember />
          </div>
        </div>
      </div>
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key = {headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key = {header.id} className="bg-slate-100">
                    {header.isPlaceholder
                      ? null
                      :flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow 
                key = {row.id}
                data-state = {row.getIsSelected() && "selected"}
                className="bg-white"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key = {cell.id}>
                    {flexRender(cell.column.columnDef.cell,cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan = {columns.length} className = "h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
    <div className="flex items-center justify-end space-x-2 py-4">
    <Button
          variant="outline"
          size="sm"
          onClick={() => table.setPageIndex(0)}
        >
          First Page
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          Last Page
        </Button>
      </div>
    </div>
  )
}
