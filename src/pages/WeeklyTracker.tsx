import { columns } from "@/components/WeeklyTrackerTable/columns";
import { DataTable } from "@/components/WeeklyTrackerTable/data-table";
import type { Activity } from "@/components/WeeklyTrackerTable/types";
import { useState, useEffect } from "react";

function getData(): Activity[] {
  const descriptions = [
    "No Sugar",
    "No Cooking Oil",
    "No Wheat Flour",
    "Max one table spoon of salt",
    "No Snacks",
    "Vegetables at each meal",
    "10 minutes of sport",
    "Walk 8000 steps",
    "Write down everything you eat",
  ];

  return descriptions.map((description, index) => ({
    id: index + 1,
    description,
    monday: "pending",
    tuesday: "success",
    wednesday: "failed",
    thursday: "pending",
    friday: "success",
    saturday: "pending",
    sunday: "success",
  }));
}

export default function WeeklyTracker() {
  const [data, setData] = useState<Activity[]>([]);

  useEffect(() => {
    async function fetchData() {
      const result = getData();
      setData(result);
    }

    fetchData();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
