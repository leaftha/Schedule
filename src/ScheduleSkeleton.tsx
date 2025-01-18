import style from "./ScheduleSkeleton.module.css";

const ScheduleSkeleton = () => {
  return (
    <ul className={style.scheduleList}>
      {Array(7)
        .fill(0)
        .map((_, index) => (
          <li
            className={`${style.scheduleItem} ${style.shimmerWrapper}`}
            key={index}
          >
            <div className={style.shimmer}></div>

            <div className={`${style.colorbox} `}></div>
            <h1 className={`${style.content} `}></h1>
            <p className={`${style.deleteBtn} `}></p>
          </li>
        ))}
    </ul>
  );
};

export default ScheduleSkeleton;
