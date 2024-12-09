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
    // const dbRef = ref(db);
    // get(child(dbRef, "/user_id"))
    //   .then((snapshot) => {
    //     if (snapshot.exists()) {
    //       const UserData = snapshot.val();
    //       console.log(UserData);
    //       // if (UserData.id) {
    //       //   checkLoggIn(true);
    //       //   console.log("로그인 성공");
    //       // } else {
    //       //   console.log("로그인 실패");
    //       // }
    //     } else {
    //       console.log("No data available");
    //     }
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
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
        <button className={style.btn}>
          <span>로그인</span>
        </button>
      </form>
    </div>
  );
};

export default LoggCheck;
