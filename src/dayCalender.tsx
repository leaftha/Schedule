import React, { useEffect, useState } from "react";
import { remove, ref } from "firebase/database";
import { db } from "./firebase";
import { ScheduleData } from "./types";
import useCalendar from "./useCalender";

import style from "./dayCalender.module.css";

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
  const { weekCalendarList, goToPrevMonth, goToNextMonth } = useCalendar();
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [date, setDate] = useState<Array<string>>([]);

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
    const newDate: Array<string> = [];
    for (const key in Schedules) {
      const { scheduleContent, selectedDays } = Schedules[key];
      if (selectedDays.length >= 2) {
        const getDate = getDatesInRange(
          String(selectedDays[0]),
          String(selectedDays[1])
        );
        newArr.push({
          id: key,
          content: scheduleContent,
          date: getDate,
        });
        newDate.push(...getDate);
      }
    }
    setDate(newDate);
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
    <div className={style.main}>
      <button onClick={goToPrevMonth}>Previous Month</button>
      <button onClick={goToNextMonth}>Next Month</button>
      {weekCalendarList.map((week, weekIdx) => (
        <div className={style.calender} key={`week-${weekIdx}`}>
          {week.map((day, dayIdx) => {
            const isScheduled = date.includes(`${day}`);

            return (
              <div key={`day-${dayIdx}`}>
                <p>{day !== 0 ? String(day).split("-")[2] : ""}</p>
                {isScheduled && <p style={{ color: "red" }}>일정 있음</p>}
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
