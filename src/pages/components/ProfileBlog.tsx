import React, { useEffect, Dispatch, FormEvent } from "react";
import { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { onChangeHandler } from "../../Globals/Globals";
import { AuthContext } from "../../Context/AuthContext";
import { useContext } from "react";
import { useRef } from "react";


// event,_id,blog,setClassName
export type ofBlog = {
  title: string,
  description: string,
  user: string,
  userName: string,
}

type ofProfileBlog = {
  _id: string,
  upperCasedTitle: string,
  DeleteBlog: (_id: string) => Promise<void>,
  date: string,
  description: string,
  userName: string,
  duration: number,
  Update_Blog: (event: FormEvent, _id: string, blog: ofBlog, setClassName: React.Dispatch<string>) => Promise<void>,
  processing: boolean
}

const ProfileBlog = ({
  _id,
  upperCasedTitle,
  DeleteBlog,
  date,
  description,
  userName,
  duration,
  Update_Blog,
  processing
}: ofProfileBlog) => {
  const [className, setClassName] = useState("hidden");

  const { logIn } = useContext(AuthContext);
  const { userInfo } = logIn;
  const { userId, name } = userInfo;
  const [blog, setBlog] = useState({
    title: upperCasedTitle,
    description: description,
    user: userId,
    userName: name,
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const style = {
    animation: `transformX100rem ${duration}ms linear`
  }
  return (
    <main key={_id}>
      <div className={"flex flex-col gap-[0.3rem] boxShadow p-[1rem]"} style={style}>
        <section className="flex justify-between">
          <h3 className="text-blue-400">{upperCasedTitle}</h3>
          <div>
            <RiDeleteBinLine
              className="text-blue-400 text-[1.4rem] hover:text-blue-600"
              onClick={() => DeleteBlog(_id)}
            />
            <FiEdit
              className={`text-blue-400 text-[1.4rem] hover:text-blue-600`}
              onClick={() => {
                setClassName("transformY10rem");
                setTimeout(() => {
                  inputRef.current?.focus();
                }, 500);
              }}
            />
          </div>
        </section>
        <small className="text-gray-400">
          Published on: {date.slice(0, 10)}
        </small>
        <p>{description}</p>
        <small className="self-end">
          <span className="font-semibold text-slate-400 bg-slate-200 rounded-sm p-[0.1rem]">{`by ${userName}`}</span>
        </small>
      </div>
      <section className={`${className} `}>
        <form
          autoComplete="off"
          className="flex flex-col gap-[1.6rem]"
          onSubmit={(event) => Update_Blog(event, _id, blog, setClassName)}
        >
          <input
            type="text"
            name="title"
            placeholder="Title"
            ref={inputRef}
            value={blog.title}
            onChange={(event) => {
              onChangeHandler(event, setBlog);
            }}
            className="indent-[1rem] py-[0.7rem] rounded-[0.3rem] outline-blue-400 border-none text-[1.2rem] bg-slate-200 font-bold"
            required
          />
          <textarea
            name="description"
            cols={30}
            rows={10}
            value={blog.description}
            onChange={(event) => onChangeHandler(event, setBlog)}
            placeholder="Description"
            spellCheck={"false"}
            tabIndex={0}
            className="indent-[1rem] py-[0.7rem] rounded-[0.3rem] outline-blue-400 border-none text-[1.2rem] bg-slate-200 p-3"
            required
          ></textarea>
          <div className="flex justify-end gap-[1rem] px-2">
            <span
              className="self-end text-[1.3rem] text-slate-700 border-none cursor-default bg-blue-200 p-1 rounded-md hover:bg-blue-300"
              onClick={(event) => {
                event.stopPropagation()
                setClassName("hidden")
                setBlog({
                  title: upperCasedTitle,
                  description: description,
                  user: userId,
                  userName: name,
                })

              }}
            >
              Cancel
            </span>
            <button
              type="submit"
              disabled={processing}
              className="self-end text-[1.3rem] text-slate-700 border-none bg-blue-400 p-1 rounded-md hover:bg-blue-500"
            >
              {!processing ? "Update" : (
                <div className="flex justify-center items-center min-w-[47px] min-h-[30px]">
                  <div className="loader"></div>
                </div>)
              }
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default ProfileBlog;
