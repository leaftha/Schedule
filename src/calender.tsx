import DayCalender from "./dayCalender";
import { useSchedule } from "./scheduleProvider";
import { ScheduleData } from "./types";
import WeekCalender from "./weekCalender";

const Calender = ({
  user,
  weekSchedules,
  deleteWeek,
  DaySchedules,
  deleteDay,
  setCurrentDate,
}: {
  user: string;
  weekSchedules: ScheduleData;
  deleteWeek: React.Dispatch<React.SetStateAction<ScheduleData>>;
  DaySchedules: ScheduleData;
  deleteDay: React.Dispatch<React.SetStateAction<ScheduleData>>;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
}) => {
  const { scheduleType } = useSchedule();

  return (
    <>
      {scheduleType === "주" ? (
        <WeekCalender
          user={user}
          Schedules={weekSchedules}
          setSchedules={deleteWeek}
        />
      ) : (
        <DayCalender
          user={user}
          Schedules={DaySchedules}
          setSchedules={deleteDay}
          setCurrentDate={setCurrentDate}
        />
      )}
    </>
  );
};

export default Calender;
