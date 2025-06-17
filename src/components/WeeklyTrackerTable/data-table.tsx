/* eslint-disable @typescript-eslint/no-explicit-any */ // -- to resolve the 'any' warning

import { type ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { ActivityStatus } from "./types";
import { isWeekDayColumn, statusOrder, statusStyles } from "./helpers";

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onDataChange?: (data: TData[]) => void;
}

export function DataTable<TData, TValue>({ columns, data, onDataChange }: DataTableProps<TData, TValue>) {
  const getNextStatus = (currentStatus: ActivityStatus): ActivityStatus => {
    const currentIndex = statusOrder.indexOf(currentStatus);
    return statusOrder[(currentIndex + 1) % statusOrder.length];
  };

  const handleCellClick = (rowIndex: number, columnId: string) => {
    if (!isWeekDayColumn(columnId)) return;

    const newData = [...data];
    const row = newData[rowIndex] as any;
    const currentStatus = row[columnId] as ActivityStatus;
    const nextStatus = getNextStatus(currentStatus);

    row[columnId] = nextStatus;

    onDataChange?.(newData);
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const renderCell = (cell: any, rowIndex: number) => {
    const columnId = cell.column.id;

    if (isWeekDayColumn(columnId)) {
      const status = cell.getValue() as ActivityStatus;

      return (
        <button
          onClick={() => handleCellClick(rowIndex, columnId)}
          className={`
            w-full h-full px-2 py-1 sm:px-3 sm:py-2 rounded-md border-2 font-medium 
            text-xs sm:text-sm transition-all duration-200 hover:scale-105 hover:shadow-md
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
            ${statusStyles[status]}
          `}
        >
          <span className="capitalize">{status}</span>
        </button>
      );
    }

    return flexRender(cell.column.columnDef.cell, cell.getContext());
  };

  return (
    <div className="overflow-x-auto rounded-md border">
      <Table className="min-w-[700px]">
        <TableHeader className="sticky top-0 bg-white z-10 shadow-sm">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row, rowIndex) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="p-1 sm:p-2 text-xs sm:text-sm">
                    {renderCell(cell, rowIndex)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
