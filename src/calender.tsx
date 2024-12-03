import { useEffect, useState } from "react";
import { useSchedule } from "./scheduleProvider";
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

const Calender = ({ schedules }: { schedules: ScheduleData }) => {
  const { scheduleType } = useSchedule();
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

    for (let key in schedules) {
      console.log(schedules[key]);

      for (let week of schedules[key].selectedDays) {
        const dayKey = week as keyof WeekType;
        newWeekClassify[dayKey].push([schedules[key].scheduleContent, key]);
      }
    }

    setWeekClassify(newWeekClassify);
  }, [schedules]);

  console.log(weekClassify);
  return (
    <div>
      {scheduleType === "주" ? (
        <div>
          {Object.entries(weekClassify).map(([day, tasks]) => (
            <div key={day}>
              <h3>{day}</h3>
              <ul>
                {tasks.map((task, index) => (
                  <div key={index}>{task[0]}</div>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Calender;
