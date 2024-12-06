import React, { useEffect, useState } from "react";
import { remove, ref } from "firebase/database";
import { db } from "./firebase";
import { ScheduleData } from "./types";
import useCalendar from "./useCalender";

interface ScheduleItem {
  id: string;
  content: string;
  date: string[];
}

const DayCalendar = ({
  user,
  Schedules,
  setSchedules,
}: {
  user: string;
  Schedules: ScheduleData;
  setSchedules: React.Dispatch<React.SetStateAction<ScheduleData>>;
}) => {
  const { weekCalendarList } = useCalendar();
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);

  const getDatesInRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      console.error("Invalid date range:", startDate, endDate);
      return [];
    }

    const dates = [];
    const date = new Date(start);
    while (date <= end) {
      dates.push(date.toISOString().split("T")[0]); // yyyy-mm-dd 형식
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };

  useEffect(() => {
    const newArr: ScheduleItem[] = [];
    for (const key in Schedules) {
      const { scheduleContent, selectedDays } = Schedules[key];
      if (selectedDays.length >= 2) {
        newArr.push({
          id: key,
          content: scheduleContent,
          date: getDatesInRange(
            String(selectedDays[0]),
            String(selectedDays[1])
          ),
        });
      }
    }
    setSchedule(newArr);
  }, [Schedules]);

  const removeData = (id: string) => {
    setSchedules((prevWeekSchedules) => {
      const { [id]: _, ...updatedSchedules } = prevWeekSchedules;
      return updatedSchedules;
    });
    remove(ref(db, `${user}/todo_days/${id}`)).catch((error) => {
      console.error("Failed to remove data from Firebase:", error);
    });
  };

  return (
    <div>
      {weekCalendarList.map((week, weekIdx) => (
        <div key={`week-${weekIdx}`}>
          {week.map((day, dayIdx) => {
            // const daySchedules = schedule.filter((item) =>
            //   item.date.includes(String(day))
            // );
            // console.log(schedule);
            return (
              <div key={`day-${dayIdx}`}>
                <p>{day}</p>
                {/* {daySchedules.map((item) => (
                  <div key={item.id} style={{ color: "red" }}>
                    <p>{item.content}</p>
                    <button onClick={() => removeData(item.id)}>Delete</button>
                  </div>
                ))} */}
              </div>
            );
          })}
          <hr />
        </div>
      ))}
    </div>
  );
};

export default DayCalendar;
