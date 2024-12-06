import { getDaysInMonth, subMonths, addMonths, format } from "date-fns";
import React from "react";

const DATE_MONTH_FIXER = 1;
const CALENDER_LENGTH = 35;
const DEFAULT_TRASH_VALUE = "";
const DAY_OF_WEEK = 7;

const useCalendar = () => {
  const [currentDate, setCurrentDate] = React.useState(new Date());

  // 현재 월의 총 일수
  const totalMonthDays = getDaysInMonth(currentDate);

  // 현재 월의 첫째 날이 무슨 요일인지 계산
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  // 이전 달 일수 채우기 (쓰레기 값)
  const prevDayList = Array.from({ length: firstDayOfMonth }).map(
    () => DEFAULT_TRASH_VALUE
  );

  // 현재 월의 날짜 리스트
  const currentDayList = Array.from({ length: totalMonthDays }).map(
    (_, i) =>
      format(
        new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1),
        "yyyy-MM-dd"
      ) // yyyy-MM-dd 형식
  );

  // 다음 달 일수 채우기 (쓰레기 값)
  const nextDayList = Array.from({
    length: CALENDER_LENGTH - currentDayList.length - prevDayList.length,
  }).map(() => DEFAULT_TRASH_VALUE);

  // 완성된 달력 데이터
  const currentCalendarList = prevDayList.concat(currentDayList, nextDayList);

  // 주별로 나눔
  const weekCalendarList = currentCalendarList.reduce(
    (acc: (string | number)[][], cur, idx) => {
      const chunkIndex = Math.floor(idx / DAY_OF_WEEK);
      if (!acc[chunkIndex]) {
        acc[chunkIndex] = [];
      }
      acc[chunkIndex].push(cur);
      return acc;
    },
    []
  );

  // 이전 달 이동
  const goToPrevMonth = () => setCurrentDate((prev) => subMonths(prev, 1));

  // 다음 달 이동
  const goToNextMonth = () => setCurrentDate((prev) => addMonths(prev, 1));

  return {
    weekCalendarList, // 주별로 나뉜 달력 데이터
    currentDate,
    setCurrentDate,
    goToPrevMonth,
    goToNextMonth,
  };
};

export default useCalendar;
