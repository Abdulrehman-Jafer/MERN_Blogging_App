import React from "react";
import { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { onChangeHandler } from "../Globals/Globals";
import { AuthContext } from "../Context/AuthContext";
import { style } from "../Globals/Globals";
// import MyToast from "../Sample";





const LoginPage = () => {
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const [paswdVisibility, setPaswdVisibility] = useState("password");
  const { logIn } = useContext(AuthContext);
  const { processing, Log_In_Handler } = logIn;
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  return (
    <>
      {/* <MyToast /> */}
      <main className="bg-slate-400 h-[100vh] flex items-center w-[100%] px-[1rem]" >
        <section className="mx-auto text-gray-700 w-[100%] max-w-[600px]" style={style}>
          <div className="w-[100%]">
            <div className="flex flex-col flex-1 justify-center bg-slate-300 p-[1rem] py-[5rem] rounded-[0.5rem]">
              <section className=" text-[2rem] font-semibold text-center mb-[2rem]">
                Log In
              </section>
              <form
                className="flex flex-col gap-[1rem]"
                onSubmit={(event) => Log_In_Handler(event, loginInfo)}
              >
                <input
                  ref={inputRef}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  required
                  className=" indent-[1rem] py-[0.7rem] rounded-[0.3rem] outline-blue-400 border-none text-[1.2rem] bg-slate-200"
                  onChange={(event) => onChangeHandler(event, setLoginInfo)}
                />
                <span className="relative w-[100%] felx">
                  <input
                    type={paswdVisibility}
                    name="password"
                    id="password"
                    placeholder="Password"
                    minLength={6}
                    required
                    onChange={(event) => onChangeHandler(event, setLoginInfo)}
                    className="w-[100%] indent-[1rem] py-[0.7rem] rounded-[0.3rem] outline-blue-400 border-none text-[1.2rem] bg-slate-200 my-[1rem]"
                  />
                  <span
                    onClick={() => {
                      if (paswdVisibility === "password") {
                        return setPaswdVisibility("text");
                      }
                      return setPaswdVisibility("password");
                    }}
                    className="text-sm underline absolute h-[100%] right-[0.3rem] text-blue-400 hover:text-blue-600 cursor-default top-8"
                  >
                    {loginInfo.password.length >= 1 && (
                      <span>
                        {paswdVisibility === "password" ? (
                          <BsFillEyeFill className="text-lg" />
                        ) : (
                          <BsFillEyeSlashFill className="text-lg" />
                        )}
                      </span>
                    )}
                  </span>
                </span>
                <button
                  type="submit"
                  disabled={processing}
                  className=" indent-1 py-[0.7rem] rounded-[0.3rem] outline-blue-400 border-none text-[1.2rem] bg-blue-400 hover:bg-blue-500 "
                >
                  {!processing ? (
                    "Log in"
                  ) : (
                    <div className="flex justify-center items-center">
                      <div className="loader"></div>
                    </div>
                  )}
                </button>
              </form>
              <section className="mt-[2rem] felx text-center">
                <span>Don't have an acount? </span>
                <Link to={"/signup"}>
                  <span className="text-blue-500 cursor-default underline">
                    Sign up
                  </span>
                </Link>
              </section>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default LoginPage;
