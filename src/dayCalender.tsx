import React, { useEffect, useState } from "react";
import { ScheduleData } from "./types";
import useCalendar from "./useCalender";
import { useSchedule } from "./scheduleProvider";

import style from "./dayCalender.module.css";

const DayCalendar = ({
  user,
  Schedules,
  setSchedules,
  setCurrentDate,
}: {
  user: string;
  Schedules: ScheduleData;
  setSchedules: React.Dispatch<React.SetStateAction<ScheduleData>>;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
}) => {
  const { weekCalendarList, currentDate, goToPrevMonth, goToNextMonth } =
    useCalendar();
  // const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [date, setDate] = useState<string[][]>([]);
  const { setSelectedDay } = useSchedule();
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
    const newDate: Array<string[]> = [];
    for (const key in Schedules) {
      const { scheduleContent, selectedDays } = Schedules[key];
      if (selectedDays.length >= 2) {
        const getDate = getDatesInRange(
          String(selectedDays[0]),
          String(selectedDays[1]),
          Schedules[key].color
        );

        newDate.push(...getDate);
      }
    }
    setDate(newDate);
  }, [Schedules]);

  useEffect(() => {
    setCurrentDate(currentDate);
  }, [currentDate]);
  const weekTitle = ["일", "월", "화", "수", "목", "금", "토"];
  return (
    <div className={style.main}>
      <div className={style.month}>
        <h1>
          {currentDate.getFullYear()} : {currentDate.getMonth() + 1}
        </h1>
      </div>
      <div className={style.btns}>
        <button className={style.btn} onClick={goToPrevMonth}>
          저번 달
        </button>
        <button className={style.btn} onClick={goToNextMonth}>
          다음 달
        </button>
      </div>
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
                  <div
                    key={`color-${idx}`}
                    className={style.daySchedule}
                    style={{ background: color }}
                    onClick={() => {
                      setSelectedDay(color);
                    }}
                  ></div>
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
