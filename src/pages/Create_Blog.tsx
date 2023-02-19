import React, { useEffect, useRef, useState } from "react";
import { onChangeHandler } from "../Globals/Globals";
import { CREATE_BLOG } from "../Globals/Globals";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MY_NAV from "./components/MyNav";
import { ofuserInfo } from "../Context/ContextTypes";
import { FormEvent, ChangeEvent } from "react";
import { toast } from "react-toastify";

const Create_Blog = ({ userInfo }: { userInfo: ofuserInfo }) => {
  const { userId, name } = userInfo;
  const [newBlog, setNewBlog] = useState({
    title: "",
    description: "",
    user: userId,
    userName: name,
  });
  const [processing, setProcessing] = useState(false)
  const navigate = useNavigate();
  const Create = async (event: FormEvent) => {
    event.preventDefault();
    setProcessing(true)
    await axios
      .post(CREATE_BLOG, newBlog)
      .then((res) => {
        if (res.status === 200) {
          setProcessing(false)
          setNewBlog({
            title: "",
            description: "",
            user: userId,
            userName: name,
          });
          toast.success("Successful");
          navigate("/explore");
        }
      })
      .catch((err) => {
        setProcessing(false)
        console.log(err)
      })
  };

  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    inputRef.current?.focus()
  }, [])
  return (
    <>
      <MY_NAV />
      <main className="max-w-[1200px] mx-auto transformY100rem px-1">
        <div className="text-blue-500">
          <h1>Create Your Post Here</h1>
          <form
            autoComplete="off"
            className="flex flex-col gap-[1.6rem] my-[2rem]"
            onSubmit={(event) => Create(event)}
          >
            <input
              type="text"
              name="title"
              placeholder="Title"
              ref={inputRef}
              value={newBlog.title}
              onChange={(event) => onChangeHandler(event, setNewBlog)}
              className="indent-[1rem] py-[0.7rem] rounded-[0.3rem] outline-blue-400 border-none text-[1.2rem] bg-slate-200 font-bold"
              required
            />
            <textarea
              name="description"
              cols={30}
              rows={10}
              value={newBlog.description}
              onChange={(event: ChangeEvent) => onChangeHandler(event, setNewBlog)}
              placeholder="Description"
              spellCheck={"false"}
              className="indent-[1rem] py-[0.7rem] rounded-[0.3rem] outline-blue-400 border-none text-[1.2rem] bg-slate-200 h-[250px] w-[100%] px-2" 
              required
            ></textarea>
            <button
              type="submit"
              className="self-end text-[2rem] sm:w-[180px] min-h-[60px] border-none bg-blue-400 p-1 rounded-md hover:bg-blue-500 mr-[0.1rem]"
              disabled={processing}
            >
              {!processing ? "Create" : (
                <div className="flex justify-center items-center w-[100%] h-[100%]">
                  <div className="loader"></div>
                </div>)
              }
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default Create_Blog;
