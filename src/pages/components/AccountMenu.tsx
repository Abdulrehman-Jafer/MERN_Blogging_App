import React, { useContext,} from "react";
import { AuthContext } from "../../Context/AuthContext";
import { AiFillSetting } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { FaInfoCircle } from "react-icons/fa";

const AccountMenu = () => {
  const { LOGOUT } = useContext(AuthContext);

  return (
    <div className={`bg-gray-600 w-[120px] text-start`}>
      <ul className="flex list-none flex-col lg:text-[1.2rem] whitespace-nowrap">
        <li className="borderBottom cursor-default font-semibold hover:bg-gray-700 p-3 flex lg:gap-[1.2rem] md:gap-[1rem] gap-[9%] items-center">
          <span className="translateY text-[1.3rem]">
            <AiFillSetting />
          </span>
          <span>Settings</span>
        </li>
        <li className="borderBottom cursor-default font-semibold hover:bg-gray-700 px-3 py-3 flex lg:gap-[1.2rem] md:gap-[1rem] gap-[9%] items-center">
          <span className="translateY  lg:text-[1.3rem]">
            <FaInfoCircle />
          </span>
          <span>About us</span>
        </li>
        <li
          className="cursor-default font-semibold hover:bg-gray-700 px-3 py-3 flex lg:gap-[1.2rem] md:gap-[1rem] gap-[9%] items-center"
          onClick={() => LOGOUT()}
        >
          <span className="translateY lg:text-[1.3rem]">
            <BiLogOut />
          </span>
          <span>Log out</span>
        </li>
      </ul>
    </div>
  );
};

export default AccountMenu;
