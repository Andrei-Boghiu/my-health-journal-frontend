export type ActivityStatus = "pending" | "success" | "failed";

export const WeekDays = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
} as const;

export type WeekDay = (typeof WeekDays)[keyof typeof WeekDays];
export type WeekDayKey = keyof typeof WeekDays;

export type Activity = {
  id: number;
  description: string;
} & Record<WeekDayKey, ActivityStatus>;
