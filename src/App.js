import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import styles from "./App.module.css";
import MailBoxInboxList from "./Components/MailBoxInboxList";
import MailBoxMainPage from "./Components/MailBoxMainPage";
import MailBoxSentList from "./Components/MailBoxSentList";
import ComposeMailForm from "./forms/composeMailForm";
import ForgotPasswordForm from "./forms/forgotPasswordForm";
import ListedEmailOpenForm from "./forms/listedEmailOpenForm";
import SignInForm from "./forms/signInForm";
import SignUpForm from "./forms/signUpForm";
import UpdateProfileForm from "./forms/updateProfileForm";
import { getUserDataAction } from "./reducer/asyncAuthReducer";
import { getEmailDataAction } from "./reducer/asyncMailBoxReducer";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userProfileData);
  const outboxListOpen = useSelector((state) => state.mailBoxClient.outboxList);
  const inboxListOpen = useSelector((state) => state.mailBoxClient.inboxList);
  const DialogOpen = useSelector(
    (state) => state.mailBoxClient.listedEmailOpenForm
  );

  useEffect(() => {
    dispatch(getUserDataAction());
  }, []);
  useEffect(() => {
    if (userData) {
      setInterval(() => {
        dispatch(getEmailDataAction(userData.email));
      }, 1000);
    }
  }, [userData]);
  useEffect(() => {
    if (userData) {
      console.log("uhbuhbuhbuh");
      navigate("/mailboxmainpage");
    } else {
      navigate("/");
    }
  }, [userData]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<SignInForm />}></Route>
        <Route path="/signupform" element={<SignUpForm />}></Route>
        <Route
          path="/forgotpasswordform"
          element={<ForgotPasswordForm />}
        ></Route>
        {userData && (
          <Route
            path="mailboxmainpage"
            element={
              <div className={styles.container}>
                <div className={styles.left}>
                  <MailBoxMainPage />
                </div>
                {inboxListOpen && (
                  <div className={styles.right}>
                    <MailBoxInboxList />
                  </div>
                )}
                {outboxListOpen && (
                  <div className={styles.right}>
                    <MailBoxSentList />
                  </div>
                )}
                <ComposeMailForm />
                {DialogOpen && <ListedEmailOpenForm />}
              </div>
            }
          ></Route>
        )}
        <Route
          path="/updateprofileform"
          element={<UpdateProfileForm />}
        ></Route>
      </Routes>
    </div>
  );
}
export default App;
