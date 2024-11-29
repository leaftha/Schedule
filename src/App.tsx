import { useState } from "react";
import "./App.css";
import LoggChect from "./LoggCheck";

function App() {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  return (
    <div>
      {isLogged ? (
        <div></div>
      ) : (
        <div>
          <h1>로그인</h1>
          <LoggChect checkLoggIn={setIsLogged} />
        </div>
      )}
    </div>
  );
}

export default App;
