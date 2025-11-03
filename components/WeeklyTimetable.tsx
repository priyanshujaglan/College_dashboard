import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TimeSlot {
  time: string;
  subject?: string;
  code?: string;
  location?: string;
  type?: "lecture" | "lab" | "tutorial";
}

interface DaySchedule {
  day: string;
  slots: TimeSlot[];
}

const weekSchedule: DaySchedule[] = [
  {
    day: "Monday",
    slots: [
      { time: "09:00", subject: "Data Structures", code: "CS201", location: "Room 301", type: "lecture" },
      { time: "11:00", subject: "Calculus II", code: "MATH202", location: "Room 105", type: "lecture" },
      { time: "14:00", subject: "Web Development", code: "CS250", location: "Lab 3", type: "lab" },
    ],
  },
  {
    day: "Tuesday",
    slots: [
      { time: "10:00", subject: "Database Systems", code: "CS301", location: "Room 402", type: "lecture" },
      { time: "15:00", subject: "Data Structures", code: "CS201", location: "Lab 2", type: "tutorial" },
    ],
  },
  {
    day: "Wednesday",
    slots: [
      { time: "09:00", subject: "Software Engineering", code: "CS305", location: "Room 201", type: "lecture" },
      { time: "13:00", subject: "Calculus II", code: "MATH202", location: "Room 105", type: "tutorial" },
    ],
  },
  {
    day: "Thursday",
    slots: [
      { time: "10:00", subject: "Database Systems", code: "CS301", location: "Lab 4", type: "lab" },
      { time: "14:00", subject: "Web Development", code: "CS250", location: "Room 303", type: "lecture" },
    ],
  },
  {
    day: "Friday",
    slots: [
      { time: "09:00", subject: "Software Engineering", code: "CS305", location: "Lab 1", type: "lab" },
      { time: "11:00", subject: "Computer Networks", code: "CS310", location: "Room 501", type: "lecture" },
    ],
  },
];

const typeColors = {
  lecture: "bg-primary/10 border-l-4 border-l-primary",
  lab: "bg-secondary/10 border-l-4 border-l-secondary",
  tutorial: "bg-accent/10 border-l-4 border-l-accent",
};

export const WeeklyTimetable = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Weekly Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {weekSchedule.map((day) => (
            <div key={day.day} className="border-b pb-4 last:border-b-0">
              <h3 className="font-semibold text-lg mb-3 text-foreground">{day.day}</h3>
              <div className="space-y-2">
                {day.slots.map((slot, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg transition-all hover:shadow-md ${
                      slot.type ? typeColors[slot.type] : "bg-muted"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-sm text-foreground">
                            {slot.time}
                          </span>
                          {slot.subject && (
                            <>
                              <span className="font-medium text-foreground">{slot.subject}</span>
                              <span className="text-sm text-muted-foreground">{slot.code}</span>
                            </>
                          )}
                        </div>
                        {slot.location && (
                          <p className="text-sm text-muted-foreground mt-1">{slot.location}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};