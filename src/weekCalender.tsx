import React, { useEffect, useState } from "react";
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
        newWeekClassify[dayKey].push([
          Schedules[key].scheduleContent,
          Schedules[key].color,
        ]);
      }
    }

    setWeekClassify(newWeekClassify);
  }, [Schedules]);

  return (
    <div className={style.main}>
      {Object.entries(weekClassify).map(([day, tasks]) => (
        <div className={style.content} key={day}>
          <h3 className={style.title}>{day}</h3>
          <ul className={style.schedule}>
            {tasks.map((task, index) => (
              <div className={style.scheduleContent} key={index}>
                <p>{task[0]}</p>
                <div
                  className={style.colorbox}
                  style={{ background: task[1] }}
                ></div>
              </div>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default WeekCalender;
