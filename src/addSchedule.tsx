import { useState } from "react";
import { ref, set, remove } from "firebase/database";
import { db } from "./firebase";
import { uid } from "uid";
import { useSchedule } from "./scheduleProvider";
import { ScheduleData, ScheduleItem } from "./types";
import style from "./addSchedule.module.css";

const saveDB = (
  user: string,
  dbPath: string,
  uuid: string,
  data: ScheduleItem
) => {
  set(ref(db, `${user}/${dbPath}/${uuid}`), data);
};

const AddSchedule = ({
  user,
  week,
  addWeek,
  day,
  addDay,
}: {
  user: string;
  week: ScheduleData;
  addWeek: React.Dispatch<React.SetStateAction<ScheduleData>>;
  day: ScheduleData;
  addDay: React.Dispatch<React.SetStateAction<ScheduleData>>;
}) => {
  const { scheduleType, setScheduleType } = useSchedule();
  const [scheduleContent, setScheduleContent] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [startDays, setStartDays] = useState<string>("");
  const [endDays, setEndDays] = useState<string>("");
  const [selectedDays, setSelectedDays] = useState<
    string[] | FormDataEntryValue[]
  >([]);

  const inputSchedule = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if (scheduleContent === "" || selectedDays.length === 0) {
    //   alert("날짜와 내용을 입력해 주세요");
    //   return;
    // }
    let newData: ScheduleItem = {
      scheduleContent: "",
      selectedDays: [],
      color: "",
    };

    const uuid = uid();
    const dbPath = scheduleType === "주" ? "todo_week" : "todo_days";
    if (scheduleType === "주") {
      saveDB(user, dbPath, uuid, { selectedDays, scheduleContent, color });
    } else {
      const selectedDays = [startDays, endDays];
      saveDB(user, dbPath, uuid, { selectedDays, scheduleContent, color });
    }
    newData.scheduleContent = scheduleContent;
    newData.selectedDays = selectedDays;
    newData.color = color;
    let newSchedule = {};
    if (scheduleType === "주") {
      newSchedule = {
        ...week,
        [uuid]: newData,
      };
      addWeek(newSchedule);
    } else {
      newSchedule = {
        ...day,
        [uuid]: newData,
      };
      addDay(newSchedule);
    }
    setScheduleContent("");
  };
  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScheduleContent(e.target.value);
  };

  const removeData = (id: string) => {
    if (scheduleType === "주") {
      addWeek((prevWeekSchedules) => {
        const { [id]: _, ...updatedSchedules } = prevWeekSchedules;
        return updatedSchedules;
      });
      remove(ref(db, `${user}/todo_week/${id}`)).catch((error) => {
        console.error("Failed to remove data from Firebase:", error);
      });
    } else {
      addDay((prevWeekSchedules) => {
        const { [id]: _, ...updatedSchedules } = prevWeekSchedules;
        return updatedSchedules;
      });
      remove(ref(db, `${user}/todo_week/${id}`)).catch((error) => {
        console.error("Failed to remove data from Firebase:", error);
      });
    }
  };

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  return (
    <div className={style.main}>
      <form className={style.inputForm} onSubmit={inputSchedule}>
        <div className={style.btns}>
          <h1
            className={style.btn}
            style={scheduleType !== "주" ? { opacity: 0.5 } : { opacity: 1 }}
            onClick={() => setScheduleType("주")}
          >
            주
          </h1>
          <h1
            className={style.btn}
            style={scheduleType === "주" ? { opacity: 0.5 } : { opacity: 1 }}
            onClick={() => setScheduleType("월")}
          >
            월
          </h1>
        </div>
        {scheduleType === "주" ? (
          <div className={style.days}>
            {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
              <h1
                key={day}
                style={
                  selectedDays.includes(day) ? { opacity: 1 } : { opacity: 0.5 }
                }
                className={style.dayBtn}
                onClick={() => toggleDay(day)}
              >
                {day}
              </h1>
            ))}
          </div>
        ) : (
          <div>
            <label>시작</label>
            <input
              value={startDays}
              onChange={(e) => setStartDays(e.target.value)}
              name="days"
              type="date"
            />
            <label>끝</label>
            <input
              value={endDays}
              onChange={(e) => setEndDays(e.target.value)}
              name="days"
              type="date"
            />
          </div>
        )}
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <input
          className={style.inpuBox}
          value={scheduleContent}
          placeholder="내용 입력해주세요"
          onChange={changeInput}
        />
        <button className={style.inputBtn} type="submit">
          추가
        </button>
      </form>
      {scheduleType === "주" ? (
        <ul className={style.scheduleList}>
          {Object.entries(week).map(([day, tasks]) => (
            <li className={style.scheduleItem} key={day}>
              <h1>{week[day].scheduleContent}</h1>
              <p className={style.deleteBtn} onClick={() => removeData(day)}>
                X
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default AddSchedule;
