import { useEffect, useState } from "react";
import "./App.css";
import LoggChect from "./LoggCheck";
import AddSchedule from "./addSchedule";
import Calender from "./calender";
import { ScheduleProvider } from "./scheduleProvider";
import { ref, child, get } from "firebase/database";
import { db } from "./firebase";
import { ScheduleData } from "./types";

function App() {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [weekData, setWeekData] = useState<ScheduleData>({});
  const [DayData, setDayData] = useState<ScheduleData>({});
  useEffect(() => {
    if (!isLogged) return;
    const dbRef = ref(db);
    get(child(dbRef, "/todo_days"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setDayData(data);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
    get(child(dbRef, "/todo_week"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setWeekData(data);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [isLogged]);
  console.log(weekData);
  return (
    <div>
      {isLogged ? (
        <div>
          <ScheduleProvider>
            <AddSchedule week={weekData} addWeek={setWeekData} />
            <Calender schedules={weekData} />
          </ScheduleProvider>
        </div>
      ) : (
        <div>
          <h1>로그인</h1>
          <LoggChect checkLoggIn={setIsLogged} />
        </div>
      )}
    </div>
  );
}

export default App;
