import style from "./ScheduleList.module.css";
import { ScheduleItem } from "./types";

const ScheduleList = ({
  daySorted,
  selectDay,
  removeData,
}: {
  daySorted: [string, ScheduleItem][];
  selectDay: string;
  removeData: (id: string) => void;
}) => (
  <ul className={style.scheduleList}>
    {daySorted.map((day) => (
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
        <p className={style.deleteBtn} onClick={() => removeData(day[0])}></p>
      </li>
    ))}
  </ul>
);

export default ScheduleList;
