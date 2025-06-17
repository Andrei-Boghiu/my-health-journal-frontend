import { columns } from "@/components/WeeklyTrackerTable/columns";
import { DataTable } from "@/components/WeeklyTrackerTable/data-table";
import { WeeklyMobileView } from "@/components/WeeklyTrackerTable/data-table-mobile";
import { getInitialData } from "@/components/WeeklyTrackerTable/helpers";
import type { Activity } from "@/components/WeeklyTrackerTable/types";
import { useMediaQuery, useLocalStorage } from "react-haiku";

export default function WeeklyTracker() {
  const isMobile = useMediaQuery("(max-width: 1024px)", true);

  const [data, setData] = useLocalStorage<Activity[]>("weeklyTrackerData", getInitialData());

  const handleDataChange = (newData: Activity[]) => {
    setData(newData);
  };

  const resetData = () => {
    setData(getInitialData());
  };

  return (
    <div className="container mx-auto py-5">
      <div className="mx-2">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Weekly Tracker</h1>
          <button
            onClick={resetData}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            Reset All
          </button>
        </div>

        <div className="mb-4 text-sm text-gray-600 bg-blue-50 p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>
              Click on any weekday status to cycle through:{" "}
              <span className="font-mono">Pending → Success → Failed</span>
            </li>
            <li>Your progress is automatically saved and will persist between sessions</li>
            <li>Use the "Reset All" button to start fresh</li>
          </ul>
        </div>

        {isMobile ? (
          <WeeklyMobileView data={data} onDataChange={handleDataChange} />
        ) : (
          <DataTable columns={columns} data={data} onDataChange={handleDataChange} />
        )}

        <div className="mt-6 text-sm text-gray-500 text-center">
          <p>Track your daily health goals and build better habits! 🌟</p>
        </div>
      </div>
    </div>
  );
}
