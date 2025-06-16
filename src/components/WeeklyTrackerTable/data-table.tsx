/* eslint-disable @typescript-eslint/no-explicit-any */ // -- to resolve the 'any' warning

import { type ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState, useEffect } from "react";
import type { ActivityStatus } from "./types";

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
  success: "bg-green-100 text-green-800 border-green-300",
  failed: "bg-red-100 text-red-800 border-red-300",
};

const statusOrder: ActivityStatus[] = ["pending", "success", "failed"];

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onDataChange?: (data: TData[]) => void;
}

export function DataTable<TData, TValue>({ columns, data: initialData, onDataChange }: DataTableProps<TData, TValue>) {
  const [data, setData] = useState<TData[]>(initialData);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const weekDayKeys = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

  const isWeekDayColumn = (columnId: string) => {
    return weekDayKeys.includes(columnId.toLowerCase());
  };

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
    setData(newData);

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
            w-full h-full px-3 py-2 rounded-md border-2 font-medium text-sm
            transition-all duration-200 hover:scale-105 hover:shadow-md
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
    <div className="rounded-md border">
      <Table>
        <TableHeader>
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
                  <TableCell key={cell.id} className="p-1">
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
