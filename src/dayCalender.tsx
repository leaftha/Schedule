import React, { useEffect, useState } from "react";
import { remove, ref } from "firebase/database";
import { db } from "./firebase";
import { ScheduleData } from "./types";

type WeekType = {
  일: Array<[string, string]>;
  월: Array<[string, string]>;
  화: Array<[string, string]>;
  수: Array<[string, string]>;
  목: Array<[string, string]>;
  금: Array<[string, string]>;
  토: Array<[string, string]>;
};

const DayCalender = ({
  Schedules,
  setSchedules,
}: {
  Schedules: ScheduleData;
  setSchedules: React.Dispatch<React.SetStateAction<ScheduleData>>;
}) => {
  const removeData = (id: string) => {
    setSchedules((prevWeekSchedules) => {
      const { [id]: _, ...updatedSchedules } = prevWeekSchedules;
      return updatedSchedules;
    });
    remove(ref(db, `/todo_days/${id}`)).catch((error) => {
      console.error("Failed to remove data from Firebase:", error);
    });
  };

  return <div></div>;
};

export default DayCalender;
