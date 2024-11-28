import { useState } from "react";
import "./App.css";
import LoggeinModal from "./LoggeinModal";

function App() {
  const [isLoggeInd, setIsLoggedIn] = useState<Boolean>(false);
  return (
    <div>
      <h1>세찬의 스케줄 관리</h1>
      {isLoggeInd ? (
        <div></div>
      ) : (
        <div>
          <h1>로그인</h1>
          <LoggeinModal />
        </div>
      )}
    </div>
  );
}

export default App;
