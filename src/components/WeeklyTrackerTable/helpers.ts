import type { Activity, ActivityStatus } from "./types";

export const statusOrder: ActivityStatus[] = ["pending", "success", "failed"];

export const weekDayKeys = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

export const isWeekDayColumn = (columnId: string) => {
  return weekDayKeys.includes(columnId.toLowerCase());
};

export const statusStyles = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
  success: "bg-green-100 text-green-800 border-green-300",
  failed: "bg-red-100 text-red-800 border-red-300",
};

export function getInitialData(): Activity[] {
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

export const statusEmojiMap: Record<ActivityStatus, string> = {
  pending: "⏳",
  success: "✅",
  failed: "❌",
};
