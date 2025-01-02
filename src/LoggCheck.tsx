import style from "./LoggCheck.module.css";
import { auth } from "./firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const LoggCheck = ({
  checkLoggIn,
  setUser,
}: {
  checkLoggIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const sign = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // Attempt to get the credential
        const credential = GoogleAuthProvider.credentialFromResult(result);

        if (credential) {
          // If credential is not null, use the access token
          const token = credential.accessToken;
          // The signed-in user info
          const user = result.user;
          // console.log("Token:", token);
          // console.log("User:", user);
          if (user.uid) {
            setUser(user.uid);
          }
          checkLoggIn(true);
        } else {
          console.error("Credential is null.");
        }
      })
      .catch((error) => {
        // Handle Errors here
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData?.email; // Optional chaining for safety
        const credential = GoogleAuthProvider.credentialFromError(error);

        console.error("Error Code:", errorCode);
        console.error("Error Message:", errorMessage);
        console.error("Email:", email);
        console.error("Credential:", credential);
      });
  };

  return (
    <div className={style.main}>
      <button className={style.btn} onClick={sign}>
        로그인
      </button>
    </div>
  );
};

export default LoggCheck;
