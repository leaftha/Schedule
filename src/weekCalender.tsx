import React, { useEffect, useState } from "react";
import { remove, ref } from "firebase/database";
import { db } from "./firebase";
import style from "./weekCalender.module.css";
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

const WeekCalender = ({
  user,
  Schedules,
  setSchedules,
}: {
  user: string;
  Schedules: ScheduleData;
  setSchedules: React.Dispatch<React.SetStateAction<ScheduleData>>;
}) => {
  const [weekClassify, setWeekClassify] = useState<WeekType>({
    일: [],
    월: [],
    화: [],
    수: [],
    목: [],
    금: [],
    토: [],
  });

  useEffect(() => {
    const newWeekClassify: WeekType = {
      일: [],
      월: [],
      화: [],
      수: [],
      목: [],
      금: [],
      토: [],
    };

    for (let key in Schedules) {
      for (let week of Schedules[key].selectedDays) {
        const dayKey = week as keyof WeekType;
        newWeekClassify[dayKey].push([Schedules[key].scheduleContent, key]);
      }
    }

    setWeekClassify(newWeekClassify);
  }, [Schedules]);

  // const removeData = (id: string) => {
  //   setSchedules((prevWeekSchedules) => {
  //     const { [id]: _, ...updatedSchedules } = prevWeekSchedules;
  //     return updatedSchedules;
  //   });
  //   remove(ref(db, `${user}/todo_week/${id}`)).catch((error) => {
  //     console.error("Failed to remove data from Firebase:", error);
  //   });
  // };

  return (
    <div className={style.main}>
      {Object.entries(weekClassify).map(([day, tasks]) => (
        <div className={style.content} key={day}>
          <h3 className={style.title}>{day}</h3>
          <ul className={style.schedule}>
            {tasks.map((task, index) => (
              <div className={style.scheduleContent} key={index}>
                <p>{task[0]}</p>
                {/* <p className={style.btn} onClick={() => removeData(task[1])}>
                  X
                </p> */}
              </div>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default WeekCalender;
