import React, { useEffect,useContext,useState,useRef } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { onChangeHandler} from "../Globals/Globals";
import { style } from "../Globals/Globals";
import 'react-toastify/dist/ReactToastify.css';






const SignUpForm = () => {
  const [signUpInfo, setSignUpInfo] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const {signUp} = useContext(AuthContext)
  const {processing,Sign_Up_Handler} = signUp

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if(inputRef.current){
      inputRef.current.focus();
    }
  }, []);


  return (
    <main className="bg-slate-400 h-[100vh] flex items-center px-[1rem]">
      <main className="lg:w-[600px] md:[400px] sm:[200px] mx-auto text-gray-700" style={style}>
        <main className="flex flex-col gap-[1rem] justify-center bg-slate-300 p-[1rem] rounded-[0.5rem] py-[2rem]">
          <section className=" text-[2rem] font-semibold text-center">
            Sign Up
          </section>
          <form
            autoComplete="off"
            onSubmit={(event) => Sign_Up_Handler(event,signUpInfo,setSignUpInfo)}
            className="flex flex-col gap-[1.6rem] my-[2rem]"
          >
            <input
              ref={inputRef}
              // onKeyPress={(e)=>RestrictSpaceSpecial(e)}
              type="text"
              name="name"
              placeholder="Name"
              value={signUpInfo.name}
              onChange={(event) => onChangeHandler(event,setSignUpInfo)}
              className="indent-[1rem] py-[0.7rem] rounded-[0.3rem] outline-blue-400 border-none text-[1.2rem] bg-slate-200"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={signUpInfo.email}
              onChange={(event) => onChangeHandler(event,setSignUpInfo)}
              className="indent-[1rem] py-[0.7rem] rounded-[0.3rem] outline-blue-400 border-none text-[1.2rem] bg-slate-200"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              minLength={6}
              value={signUpInfo.password}
              onChange={(event) => onChangeHandler(event,setSignUpInfo)}
              className="indent-[1rem] py-[0.7rem] rounded-[0.3rem] outline-blue-400 border-none text-[1.2rem] bg-slate-200"
              required
            />
            <input
              type="password"
              name="confirm"
              placeholder="Confirm Password"
              value={signUpInfo.confirm}
              onChange={(event) => onChangeHandler(event,setSignUpInfo)}
              className="indent-[1rem] py-[0.7rem] rounded-[0.3rem] outline-blue-400 border-none text-[1.2rem] bg-slate-200"
              required
            />
            {signUpInfo.password !== signUpInfo.confirm && (
              <small className="text-center text-orange-800">
                Password does not match
              </small>
            )}
            <button
              disabled={signUpInfo.password !== signUpInfo.confirm}
              type="submit"
              className={`indent-1 py-[0.7rem] rounded-[0.3rem] outline-blue-400 border-none text-[1.2rem] bg-blue-400 hover:${
                signUpInfo.password === signUpInfo.confirm ? "bg-blue-500" : ""
              } `}
            >
              {!processing ? (
                "Sign up"
              ) : (
                <div className="flex justify-center items-center">
                  <div className="loader"></div>
                </div>
              )}
            </button>
            <p className="text-center">
              By signing up you are agreed to the terms of our service and
              privacy policy.
            </p>
          </form>
          <section className="text-center">
            <span>Already have an account? </span>
            <Link to={"/login"}>
              <span className="text-blue-500">Log in</span>
            </Link>
          </section>
        </main>
      </main>
    </main>
  );
};
export default SignUpForm;
