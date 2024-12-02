import { useSchedule } from "./scheduleProvider";

const Calender = () => {
  const { scheduleType, setScheduleType } = useSchedule();
  return (
    <div>
      {scheduleType === "주" ? (
        <div>
          <div></div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Calender;
