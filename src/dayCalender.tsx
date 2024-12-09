import React, { useEffect, useState } from "react";
import { remove, ref } from "firebase/database";
import { db } from "./firebase";
import { ScheduleData } from "./types";
import useCalendar from "./useCalender";

import style from "./dayCalender.module.css";

// interface ScheduleItem {
//   id: string;
//   content: string;
//   date: string[];
// }

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
  // const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [date, setDate] = useState<string[][]>([]);

  const getDatesInRange = (
    startDate: string,
    endDate: string,
    color: string
  ) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      console.error("Invalid date range:", startDate, endDate);
      return [];
    }

    const dates = [];
    const date = new Date(start);
    while (date <= end) {
      dates.push([date.toISOString().split("T")[0], color]); // yyyy-mm-dd 형식
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };

  useEffect(() => {
    // const newArr: ScheduleItem[] = [];
    const newDate: Array<string[]> = [];
    for (const key in Schedules) {
      const { scheduleContent, selectedDays } = Schedules[key];
      if (selectedDays.length >= 2) {
        const getDate = getDatesInRange(
          String(selectedDays[0]),
          String(selectedDays[1]),
          Schedules[key].color
        );
        // newArr.push({
        //   id: key,
        //   content: scheduleContent,
        //   date: getDate,
        // });
        newDate.push(...getDate);
      }
    }
    setDate(newDate);
    // setSchedule(newArr);
  }, [Schedules]);

  const weekTitle = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div className={style.main}>
      <button onClick={goToPrevMonth}>Previous Month</button>
      <button onClick={goToNextMonth}>Next Month</button>
      <div className={style.calendar}>
        {/* 요일 제목 */}
        {weekTitle.map((item, idx) => (
          <div key={`title-${idx}`} className={style.weekTitle}>
            <h1>{item}</h1>
          </div>
        ))}
        {/* 날짜 */}
        {weekCalendarList.map((week, weekIdx) =>
          week.map((day, dayIdx) => {
            let isScheduled: string[] = [];
            for (let [cur, color] of date) {
              if (cur === day) {
                isScheduled.push(color);
              }
            }
            return (
              <div key={`day-${weekIdx}-${dayIdx}`} className={style.day}>
                <p>{day !== 0 ? String(day).split("-")[2] : ""}</p>
                {isScheduled.map((color, idx) => (
                  <div key={`color-${idx}`} style={{ color: color }}>
                    일정
                  </div>
                ))}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default DayCalendar;
