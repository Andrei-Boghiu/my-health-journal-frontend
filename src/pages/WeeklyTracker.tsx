import { columns } from "@/components/WeeklyTrackerTable/columns";
import { DataTable } from "@/components/WeeklyTrackerTable/data-table";
import type { Activity } from "@/components/WeeklyTrackerTable/types";
import { useState, useEffect } from "react";

function getInitialData(): Activity[] {
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
    tuesday: "pending",
    wednesday: "pending",
    thursday: "pending",
    friday: "pending",
    saturday: "pending",
    sunday: "pending",
  }));
}

export default function WeeklyTracker() {
  const [data, setData] = useState<Activity[]>([]);

  useEffect(() => {
    // Try to load data from localStorage first
    const loadData = () => {
      try {
        const saved = localStorage.getItem("weeklyTrackerData");
        if (saved) {
          const parsedData = JSON.parse(saved);
          // Validate that the data structure is correct
          if (Array.isArray(parsedData) && parsedData.length > 0) {
            setData(parsedData);
            return;
          }
        }
      } catch (error) {
        console.log("Error loading from localStorage:", error);
      }

      // If no saved data or error, use initial data
      const initialData = getInitialData();
      setData(initialData);
    };

    loadData();
  }, []);

  const handleDataChange = (newData: Activity[]) => {
    setData(newData);

    // Save to localStorage
    try {
      localStorage.setItem("weeklyTrackerData", JSON.stringify(newData));
    } catch (error) {
      console.log("Error saving to localStorage:", error);
    }
  };

  const resetData = () => {
    const initialData = getInitialData();
    setData(initialData);

    try {
      localStorage.setItem("weeklyTrackerData", JSON.stringify(initialData));
    } catch (error) {
      console.log("Error saving to localStorage:", error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Weekly Health Tracker</h1>
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
            Click on any weekday status to cycle through: <span className="font-mono">Pending → Success → Failed</span>
          </li>
          <li>Your progress is automatically saved and will persist between sessions</li>
          <li>Use the "Reset All" button to start fresh</li>
        </ul>
      </div>

      <DataTable columns={columns} data={data} onDataChange={handleDataChange} />

      <div className="mt-6 text-sm text-gray-500">
        <p>Track your daily health goals and build better habits! 🌟</p>
      </div>
    </div>
  );
}
