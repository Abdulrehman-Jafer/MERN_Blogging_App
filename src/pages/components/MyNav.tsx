import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { PressEnter } from "../../Globals/Globals";
import { BiUserCircle } from "react-icons/bi";
import AccountMenu from "./AccountMenu";
const MY_NAV = () => {
  const [search, setSearch] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const MENU_TOGGLER = () => {
    setShowMenu((old) => !old);
  };
  const fromRef = useRef(null);
  useEffect(() => {
    PressEnter(fromRef);
  }, []);
  const { pathname } = useLocation();

  return (
    <main className="min-h-[50px] w-[100%] bg-slate-500 text-slate-300 pr-[3rem]">
      <section className="flex justify-between items-center p-[0.5rem]">
        <div className="flex sm:gap-[3rem] gap-[1rem] justify-center flex-1">
          <Link to={"/profile"}>
            <h3
              className={`${
                pathname === "/profile"
                  ? "text-slate-100"
                  : "text-slate-300 hover:text-slate-100"
              } cursor-default`}
            >
              Profile
            </h3>
          </Link>
          <Link to={"/create"}>
            <h3
              className={`${
                pathname === "/create"
                  ? "text-slate-100"
                  : "text-slate-300 hover:text-slate-100"
              } cursor-default`}
            >
              Create
            </h3>
          </Link>
          <Link to={"/explore"}>
            <h3
              className={`${
                pathname === "/explore"
                  ? "text-slate-100"
                  : "text-slate-300 hover:text-slate-100"
              } cursor-default`}
            >
              Explore
            </h3>
          </Link>
        </div>
        <div className="flex items-center gap-[2rem] ">
          <form
            ref={fromRef}
            onSubmit={(event) => {
              event.preventDefault();
              console.log(search);
            }}
          >
          </form>
          <div tabIndex={0} className="relative" onBlur={()=>setShowMenu(false)}>
            <BiUserCircle
              className={`text-[3rem] translate-y-4 cursor-pointer ${
                showMenu ? "text-slate-100" : ""
              } hover:text-slate-100`}
              onClick={MENU_TOGGLER}
            />
            <div
              className={`absolute left-[-2rem] top-[3.9rem] ${
                showMenu ? "transformX3rem" : "hidden"
              }`}
            >
              <AccountMenu />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MY_NAV;
