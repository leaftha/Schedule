import { useEffect, useState } from "react";
import { ref, set, remove } from "firebase/database";
import { db } from "./firebase";
import { uid } from "uid";
import { useSchedule } from "./scheduleProvider";
import { ScheduleData, ScheduleItem } from "./types";
import style from "./addSchedule.module.css";

const createNewData = (
  scheduleContent: string,
  selectedDays: string[] | FormDataEntryValue[],
  color: string
): ScheduleItem => ({
  scheduleContent,
  selectedDays,
  color,
});

const saveDB = (
  user: string,
  dbPath: string,
  uuid: string,
  data: ScheduleItem
) => {
  set(ref(db, `${user}/${dbPath}/${uuid}`), data);
};

const saveScheduleData = (
  saveFn: React.Dispatch<React.SetStateAction<ScheduleData>>,
  dbPath: string,
  uuid: string,
  user: string,
  newData: ScheduleItem
) => {
  saveDB(user, dbPath, uuid, newData);
  saveFn((prevSchedule) => ({
    ...prevSchedule,
    [uuid]: newData,
  }));
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
  const { scheduleType, selectDay, setScheduleType } = useSchedule();
  const [scheduleContent, setScheduleContent] = useState<string>("");
  const [color, setColor] = useState<string>(
    `#${Math.round(Math.random() * 0xffffff).toString(16)}`
  );
  const [startDays, setStartDays] = useState<string>("");
  const [endDays, setEndDays] = useState<string>("");
  const [selectedDays, setSelectedDays] = useState<
    string[] | FormDataEntryValue[]
  >([]);
  const [daySorted, setDaySorted] = useState<[string, ScheduleItem][]>([]);

  useEffect(() => {
    const changeArr = Object.entries(day);
    changeArr.sort((a, b) => {
      const parseDate = (value: unknown): number => {
        if (typeof value === "string") {
          return new Date(value).getTime();
        }
        return 0; // 기본값
      };

      const dateA = parseDate(a[1].selectedDays[0]);
      const dateB = parseDate(b[1].selectedDays[0]);
      return dateA - dateB;
    });
    setDaySorted([...changeArr]);
  }, [day]);

  const inputSchedule = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      scheduleContent === "" ||
      (scheduleType === "주" && selectedDays.length === 0)
    ) {
      alert("날짜와 내용을 입력해 주세요");
      return;
    }

    const uuid = uid();
    const dbPath = scheduleType === "주" ? "todo_week" : "todo_days";

    const newData =
      scheduleType === "주"
        ? createNewData(scheduleContent, selectedDays, color)
        : createNewData(scheduleContent, [startDays, endDays], color);

    const saveFn = scheduleType === "주" ? addWeek : addDay;

    saveScheduleData(saveFn, dbPath, uuid, user, newData);

    setScheduleContent("");
    if (scheduleType !== "주") {
      setStartDays("");
      setEndDays("");
    }

    setScheduleContent("");
    setColor(`#${Math.round(Math.random() * 0xffffff).toString(16)}`);
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
      remove(ref(db, `${user}/todo_days/${id}`)).catch((error) => {
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
          <div className={style.addDay}>
            <input
              className={style.DayInput}
              value={startDays}
              onChange={(e) => setStartDays(e.target.value)}
              name="days"
              type="date"
            />
            <h1 className={style.side}>~</h1>
            <input
              className={style.DayInput}
              value={endDays}
              onChange={(e) => setEndDays(e.target.value)}
              name="days"
              type="date"
            />
          </div>
        )}
        <div className={style.buttonDiv}>
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
            <img
              className={style.img}
              src={`${process.env.PUBLIC_URL}/pngegg.png`}
              alt="button img"
            ></img>
          </button>
        </div>
      </form>
      {scheduleType === "주" ? (
        <ul className={style.scheduleList}>
          {Object.entries(week).map(([day, tasks]) => (
            <li className={style.scheduleItem} key={day}>
              <div
                className={style.colorbox}
                style={{ background: week[day].color }}
              ></div>
              <h1>{week[day].scheduleContent}</h1>
              <p
                className={style.deleteBtn}
                onClick={() => removeData(day)}
              ></p>
            </li>
          ))}
        </ul>
      ) : (
        <ul className={style.scheduleList}>
          {daySorted.map((day, idx) => (
            <li className={style.scheduleItem} key={day[0]}>
              <div
                className={style.colorbox}
                style={{ background: day[1].color }}
              ></div>
              <h1
                className={style.content}
                style={selectDay === day[1].color ? { fontSize: "30px" } : {}}
              >
                {day[1].scheduleContent}
              </h1>
              <p
                className={style.deleteBtn}
                onClick={() => removeData(day[0])}
              ></p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddSchedule;
