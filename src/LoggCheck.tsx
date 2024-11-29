import { ref, child, get } from "firebase/database";
import { db } from "./firebase";
import { useState, useEffect } from "react";

interface User {
  user: number;
}

const LoggChect = () => {
  const [password, setPassword] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const dbRef = ref(db);
    get(child(dbRef, "/user_id"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setUser(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const cheackPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(user?.user, password);
    if (user && Number(password) === user.user) {
      console.log("로그인 성공");
    } else {
      console.log("로그인 실패");
    }
  };

  return (
    <div>
      <form onSubmit={cheackPassword}>
        <label>비밀 번호</label>
        <input type="password" value={password} onChange={changeInput} />
        <button>로그인</button>
      </form>
    </div>
  );
};

export default LoggChect;
