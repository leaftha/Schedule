import { useSchedule } from "./scheduleProvider";
import { ScheduleData } from "./types";
import WeekCalender from "./weekCalender";

const Calender = ({
  weekSchedules,
  deleteWeek,
}: {
  weekSchedules: ScheduleData;
  deleteWeek: React.Dispatch<React.SetStateAction<ScheduleData>>;
}) => {
  const { scheduleType } = useSchedule();

  return (
    <div>
      {scheduleType === "주" ? (
        <div>
          <WeekCalender weekSchedules={weekSchedules} deleteWeek={deleteWeek} />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Calender;
