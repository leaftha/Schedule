import React, { useEffect, useState } from "react";
import { remove, ref } from "firebase/database";
import { db } from "./firebase";
import { ScheduleData } from "./types";

const DayCalender = ({
  user,
  Schedules,
  setSchedules,
}: {
  user: string;
  Schedules: ScheduleData;
  setSchedules: React.Dispatch<React.SetStateAction<ScheduleData>>;
}) => {
  const removeData = (id: string) => {
    setSchedules((prevWeekSchedules) => {
      const { [id]: _, ...updatedSchedules } = prevWeekSchedules;
      return updatedSchedules;
    });
    remove(ref(db, `${user}/todo_days/${id}`)).catch((error) => {
      console.error("Failed to remove data from Firebase:", error);
    });
  };

  return <div></div>;
};

export default DayCalender;
