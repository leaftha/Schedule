import { useState } from "react";
import "./App.css";
import LoggChect from "./LoggCheck";
import AddSchedule from "./addSchedule";
import Calender from "./calender";
import { ScheduleProvider } from "./scheduleProvider";

function App() {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  return (
    <div>
      {isLogged ? (
        <div>
          <ScheduleProvider>
            <AddSchedule />
            <Calender />
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
