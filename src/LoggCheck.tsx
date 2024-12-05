import { ref, child, get } from "firebase/database";
import { db } from "./firebase";
import { useState, useEffect } from "react";

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
    <div>
      <form onSubmit={cheackPassword}>
        <label>이름</label>
        <input type="string" value={id} onChange={changeInput} />
        <button>로그인</button>
      </form>
    </div>
  );
};

export default LoggCheck;
