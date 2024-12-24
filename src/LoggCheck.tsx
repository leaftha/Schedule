import { useState, useEffect } from "react";
import style from "./LoggCheck.module.css";

const LoggCheck = ({
  checkLoggIn,
  setUser,
}: {
  checkLoggIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [id, setId] = useState<string>("");
  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const cheackPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUser(id);
    checkLoggIn(true);
  };

  return (
    <div className={style.main}>
      <h1 className={style.title}>사용자 이름</h1>
      <form onSubmit={cheackPassword}>
        <input
          className={style.inputBox}
          type="string"
          value={id}
          onChange={changeInput}
        />
        <button className={style.btn}>로그인</button>
      </form>
    </div>
  );
};

export default LoggCheck;
