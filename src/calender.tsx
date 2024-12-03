import { useState } from "react";
import { useSchedule } from "./scheduleProvider";

type WeekType = {
  일: [];
  월: [];
  화: [];
  수: [];
  목: [];
  금: [];
  토: [];
};

const Calender = ({ week }: { week: object }) => {
  const { scheduleType, setScheduleType } = useSchedule();
  const [weekClassify, setWeekClassify] = useState<WeekType>({
    일: [],
    월: [],
    화: [],
    수: [],
    목: [],
    금: [],
    토: [],
  });
  return (
    <div>
      {scheduleType === "주" ? (
        <div>
          {Object.entries(weekClassify).map(([day, tasks]) => (
            <div key={day}>
              <h3>{day}</h3>
              <ul>
                {tasks.map((task, index) => (
                  <li key={index}>{task}</li>
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
