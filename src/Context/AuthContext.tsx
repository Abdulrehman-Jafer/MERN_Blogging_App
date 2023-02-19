import React, { Dispatch } from "react";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SIGN_UP_URL_API, LOGIN_URL_API } from "../Globals/Globals";
import axios from "axios";
import { Provider, ofSign_Up_Handler, ofLog_In_Handler } from "./ContextTypes"
// import { notify } from "../Globals/Globals";
import { toast } from 'react-toastify';





export const AuthContext = createContext({} as Provider);
const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [processing, setProcessing] = useState(false);
  const [userInfo, setUserInfo] = useState({ userId: "", name: "", blogs: [] });
  const navigate = useNavigate();
  const Sign_Up_Handler: ofSign_Up_Handler = async (event, signUpInfo, setSignUpInfo) => {
    setProcessing(true);
    event.preventDefault();
    await axios
      .post(SIGN_UP_URL_API, signUpInfo)
      .then(() => {
        setSignUpInfo({ name: "", email: "", password: "", confirm: "" });
        setProcessing(false);
        toast.success("Successful");
        navigate("/login");
      })
      .catch((err) => {
        setProcessing(false);
        if (err.response.status === 400) {
          toast.error("User Already Exist");
        }
      });
  };
  const Log_In_Handler: ofLog_In_Handler = async (event, loginInfo) => {
    event.preventDefault();
    setProcessing(true);
    await axios
      .post(LOGIN_URL_API, loginInfo)
      .then((res) => {
        if (res.status === 200) {
          let { name, blogs, _id } = res.data.existingUser;
          const data = { userId: _id, name: name, blogs: blogs }
          window.localStorage.setItem("userInfo", JSON.stringify(data))
          setUserInfo(data);
          setProcessing(false);
          toast.success("Successful")
          navigate("/profile");
        }
      })
      .catch(async (err) => {
        setProcessing(false);
        const { data } = await err.response;
        if (data) {
          toast.error(data.message);
          setProcessing(false);
        } else {
          toast.error("Unable to Login");
          setProcessing(false);
        }
      });
  };
  const LOGOUT = () => {
    window.localStorage.setItem("userInfo", JSON.stringify({ userId: "", name: "", blogs: [] }))
    navigate("/login");
    toast.success("Logged Out")
  };
  return (
    <AuthContext.Provider
      value={{
        signUp: {
          processing: processing,
          Sign_Up_Handler: Sign_Up_Handler,
        },
        logIn: {
          processing: processing,
          Log_In_Handler: Log_In_Handler,
          userInfo: JSON.parse(window.localStorage.getItem("userInfo")!) ? JSON.parse(window.localStorage.getItem("userInfo")!) : { userId: "", name: "", blogs: [] },
        },
        LOGOUT: LOGOUT,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
