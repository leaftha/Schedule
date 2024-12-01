import { createContext, useContext, useState } from "react";

type ScheduleType = "주" | "월";

type ScheduleContextType = {
  scheduleType: ScheduleType;
  setScheduleType: React.Dispatch<React.SetStateAction<ScheduleType>>;
};

const TypeContext = createContext<ScheduleContextType | undefined>(undefined);

const ScheduleProvider = ({ children }: { children: React.ReactNode }) => {
  const [scheduleType, setScheduleType] = useState<ScheduleType>("주");

  return (
    <TypeContext.Provider value={{ scheduleType, setScheduleType }}>
      {children}
    </TypeContext.Provider>
  );
};

const useSchedule = () => {
  const context = useContext(TypeContext);
  if (!context) {
    throw new Error("useSchedule must be used within a ScheduleProvider");
  }
  return context;
};

export { ScheduleProvider, useSchedule };
