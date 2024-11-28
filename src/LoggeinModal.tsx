import { useState } from "react";
import { ref, child, get } from "firebase/database";
import { db } from "./firebase";
const LoggeinModal = () => {
  const [username, setUsername] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const readOne = () => {
    const dbRef = ref(db);
    get(child(dbRef, "/user_id"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div>
      <form>
        <label>이름</label>
        <input value={username} onChange={handleInputChange} />
        <label>비밀번호</label>
        <input value={username} onChange={handleInputChange} />
        <button>확인</button>
      </form>
    </div>
  );
};

export default LoggeinModal;
