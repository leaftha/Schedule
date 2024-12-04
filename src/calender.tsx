import DayCalender from "./dayCalender";
import { useSchedule } from "./scheduleProvider";
import { ScheduleData } from "./types";
import WeekCalender from "./weekCalender";

const Calender = ({
  weekSchedules,
  deleteWeek,
  DaySchedules,
  deleteDay,
}: {
  weekSchedules: ScheduleData;
  deleteWeek: React.Dispatch<React.SetStateAction<ScheduleData>>;
  DaySchedules: ScheduleData;
  deleteDay: React.Dispatch<React.SetStateAction<ScheduleData>>;
}) => {
  const { scheduleType } = useSchedule();

  return (
    <div>
      {scheduleType === "주" ? (
        <WeekCalender Schedules={weekSchedules} setSchedules={deleteWeek} />
      ) : (
        <DayCalender Schedules={DaySchedules} setSchedules={deleteDay} />
      )}
    </div>
  );
};

export default Calender;
