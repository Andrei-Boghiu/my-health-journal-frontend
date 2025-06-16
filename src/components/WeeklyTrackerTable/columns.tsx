import { type ColumnDef } from "@tanstack/react-table";
import { type Activity, WeekDays, type WeekDayKey, type WeekDay } from "./types";

const weekDayColumns: ColumnDef<Activity>[] = (Object.entries(WeekDays) as [WeekDayKey, WeekDay][]).map(
  ([key, label]) => ({
    accessorKey: key,
    header: label,
  })
);

export const columns: ColumnDef<Activity>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  ...weekDayColumns,
];
