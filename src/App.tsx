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
  const [user, setUser] = useState<string>("");
  const [dayData, setDayData] = useState<ScheduleData>({});
  useEffect(() => {
    if (!isLogged) return;
    const todday = new Date();
    const dbRef = ref(db);
    get(child(dbRef, `/${user}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setWeekData(data.todo_week || {});

          let NewweekData: ScheduleData = {};
          for (let d in data.todo_days) {
            if (todday > new Date(data.todo_days[d].selectedDays[0])) {
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
            />
            <AddSchedule
              user={user}
              week={weekData}
              addWeek={setWeekData}
              day={dayData}
              addDay={setDayData}
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
