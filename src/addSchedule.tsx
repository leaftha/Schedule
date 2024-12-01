import { useState } from "react";
import { ref, set } from "firebase/database";
import { db } from "./firebase";
import { uid } from "uid";

const saveDB = (dbPath: string, uuid: string, data: {}) => {
  set(ref(db, `${dbPath}/${uuid}`), data);
};

const AddSchedule = () => {
  const [scheduleType, setScheduleType] = useState<string>("주");
  const [scheduleContent, setScheduleContent] = useState<string>("");
  const inputSchedule = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const selectedDays = formData.getAll("days");
    const uuid = uid();

    const dbPath = scheduleType === "주" ? "todo_week" : "todo_days";

    saveDB(dbPath, uuid, { selectedDays, scheduleContent });
    setScheduleContent("");
  };
  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScheduleContent(e.target.value);
  };
  return (
    <div>
      <form onSubmit={inputSchedule}>
        <div>
          <button type="button" onClick={() => setScheduleType("주")}>
            주
          </button>
          <button type="button" onClick={() => setScheduleType("월")}>
            월
          </button>
        </div>
        {scheduleType === "주" ? (
          <div>
            <label>
              월
              <input type="checkbox" name="days" value="월" />
            </label>
            <label>
              화
              <input type="checkbox" name="days" value="화" />
            </label>
            <label>
              수
              <input type="checkbox" name="days" value="수" />
            </label>
            <label>
              목
              <input type="checkbox" name="days" value="목" />
            </label>
            <label>
              금
              <input type="checkbox" name="days" value="금" />
            </label>
            <label>
              토
              <input type="checkbox" name="days" value="토" />
            </label>
            <label>
              일
              <input type="checkbox" name="days" value="일" />
            </label>
            <label>할 일</label>
          </div>
        ) : (
          <div>
            <label>시작</label>
            <input name="days" type="date" />
            <label>끝</label>
            <input name="days" type="date" />
          </div>
        )}
        <input value={scheduleContent} onChange={changeInput} />
        <button type="submit">추가</button>
      </form>
    </div>
  );
};

export default AddSchedule;
