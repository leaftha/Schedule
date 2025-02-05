import { useEffect, useState } from "react";
import style from "./App.module.css";
import LoggCheck from "./LoggCheck";
import AddSchedule from "./addSchedule";
import Calender from "./calender";
import { ScheduleProvider } from "./scheduleProvider";
import { ref, child, get, remove } from "firebase/database";
import { db } from "./firebase";
import { ScheduleData } from "./types";

function App() {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [weekData, setWeekData] = useState<ScheduleData>({});
  const [dayData, setDayData] = useState<ScheduleData>({});
  const [user, setUser] = useState<string>("");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!isLogged) return;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    setLoading(true);

    const dbRef = ref(db);
    get(child(dbRef, `/${user}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setWeekData(data.todo_week || {});
          let NewweekData: ScheduleData = {};
          for (let d in data.todo_days) {
            const selectedDay = new Date(data.todo_days[d].selectedDays[1]);
            selectedDay.setHours(0, 0, 0, 0);

            if (selectedDay < today) {
              remove(ref(db, `${user}/todo_days/${d}`)).catch((error) => {
                console.error("Failed to remove data from Firebase:", error);
              });
              continue;
            }
            NewweekData[d] = data.todo_days[d];
          }
          setDayData(NewweekData || {});
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false); // 로딩 종료
      });
  }, [isLogged]);

  return (
    <>
      {isLogged ? (
        <div className={style.main}>
          <ScheduleProvider>
            <Calender
              user={user}
              weekSchedules={weekData}
              deleteWeek={setWeekData}
              DaySchedules={dayData}
              deleteDay={setDayData}
              setCurrentDate={setCurrentDate}
            />
            <AddSchedule
              user={user}
              loading={loading}
              week={weekData}
              addWeek={setWeekData}
              day={dayData}
              addDay={setDayData}
              currentDate={currentDate}
            />
          </ScheduleProvider>
        </div>
      ) : (
        <div className={style.loginPage}>
          <LoggCheck setUser={setUser} checkLoggIn={setIsLogged} />
        </div>
      )}
    </>
  );
}

export default App;
