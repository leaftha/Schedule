export type ScheduleItem = {
  scheduleContent: string;
  color: string;
  selectedDays: string[] | FormDataEntryValue[]; // 날짜 문자열 배열
};

export type ScheduleData = {
  [key: string]: ScheduleItem; // 키는 고유 ID이며 값은 ScheduleItem
};
