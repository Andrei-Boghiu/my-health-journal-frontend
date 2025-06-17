import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WeekDays, type Activity, type ActivityStatus, type WeekDayKey } from "./types";
import { statusEmojiMap, statusOrder, statusStyles, weekDayKeys } from "./helpers";

export interface MobileViewProps {
  data: Activity[];
  onDataChange: (data: Activity[]) => void;
}

export function WeeklyMobileView({ data, onDataChange }: MobileViewProps) {
  const getNextStatus = (current: ActivityStatus): ActivityStatus => {
    const idx = statusOrder.indexOf(current);
    return statusOrder[(idx + 1) % statusOrder.length];
  };

  const handleStatusClick = (activityIndex: number, day: WeekDayKey) => {
    const newData = [...data];
    const currentStatus = newData[activityIndex][day];
    const nextStatus = getNextStatus(currentStatus);
    newData[activityIndex][day] = nextStatus;

    onDataChange(newData);
  };

  return (
    <div className="space-y-4">
      {data.map((activity, index) => (
        <Card key={activity.id} className="shadow-md">
          <CardHeader>
            <CardTitle className="text-base font-semibold">{activity.description}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2 text-xs text-center mb-2">
              {weekDayKeys.map((day) => (
                <span key={day} className="font-semibold text-gray-600">
                  {WeekDays[day as WeekDayKey].slice(0, 3)}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {weekDayKeys.map((day) => (
                <Button
                  key={day}
                  variant="outline"
                  className={`h-10 p-0 text-xs sm:text-sm rounded-md border-2 whitespace-nowrap ${
                    statusStyles[activity[day as WeekDayKey]]
                  }`}
                  onClick={() => handleStatusClick(index, day as WeekDayKey)}
                >
                  {statusEmojiMap[activity[day as WeekDayKey]]}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
