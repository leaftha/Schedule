import { useEffect, useState } from "react";
import "./App.css";
import LoggChect from "./LoggCheck";
import AddSchedule from "./addSchedule";
import Calender from "./calender";
import { ScheduleProvider } from "./scheduleProvider";
import { ref, child, get } from "firebase/database";
import { db } from "./firebase";

function App() {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [weekData, setWeekData] = useState<object>({});
  const [DayData, setDayData] = useState<object>({});
  useEffect(() => {
    if (!isLogged) return;

    const dbRef = ref(db);
    get(child(dbRef, "/todo_days"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setDayData(Array.isArray(data) ? data : Object.values(data));
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
          setWeekData(Array.isArray(data) ? data : Object.values(data));
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [isLogged]);

  console.log(weekData);
  console.log(DayData);
  return (
    <div>
      {isLogged ? (
        <div>
          <ScheduleProvider>
            <AddSchedule />
            <Calender week={weekData} />
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
