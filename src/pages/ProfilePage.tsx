import React, { useEffect, useState, useContext, FormEvent, Dispatch } from "react";
import MY_NAV from "./components/MyNav";
import { UPDATE_BLOG_API } from "../Globals/Globals";
import axios from "axios";
import { ofBlog } from "./components/ProfileBlog";
import {
  USER_BY_ID,
  userBlogs_API,
  Capitalizer,
  DeleteBlog_API,
} from "../Globals/Globals";
import { AuthContext } from "../Context/AuthContext";
import { Link } from "react-router-dom";
import ProfileBlog from "./components/ProfileBlog";
import { toast } from 'react-toastify';
// import { notify } from "../Globals/Globals";



const ProfilePage = () => {
  const { logIn } = useContext(AuthContext);
  const { userInfo } = logIn;
  const [userBlogs, setUserBlogs] = useState([]);
  const [name, setName] = useState("");
  const [count, setCount] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [updating, setUpdating] = useState(false)


  useEffect(() => {
    const getBlogsId = async () => {
      setProcessing(true);
      await axios
        .get(userBlogs_API + userInfo?.userId)
        .then((res) => {
          setUserBlogs(res.data.userBlogs);
          setProcessing(false);
        })
        .catch((err) => {
          console.log(err);
          return setProcessing(false);
        });
    };
    getBlogsId();
  }, [count]);
  type ofstateSetter = Dispatch<string>
  const Update_Blog = async (event: FormEvent, _id: string, blog: ofBlog, setClassName: ofstateSetter) => {
    event.preventDefault();
    setUpdating(true)
    const API = UPDATE_BLOG_API + _id;
    console.log(API);
    await axios
      .put(API, blog)
      .then((res) => {
        if (res.status === 200) {
          setUpdating(false)
          setClassName("hidden");
          toast.success("Successful")
          setCount(old => old + 1)
          window.scroll(0,0)
        }
      })
      .catch((err) => {
        setUpdating(false)
        console.log(err)
      });
  };
  const DeleteBlog = async (id: string) => {
    const API = DeleteBlog_API + id;
    await axios
      .delete(API)
      .then((res) => {
        if (res.status === 200) {
          toast.error("Deleted Successfully");
          setCount((old) => old + 1);
          window.scroll(0,0)
        }
      })
      .catch((err) => console.log(err));
  };
  let duration = 200 * userBlogs.length
  const BlogElements =
    userBlogs.length !== 0 ? (
      userBlogs.map(({ _id, title, description, user, date }) => {
        const upperCasedTitle = Capitalizer(title);
        const Api = USER_BY_ID + user + "/";
        const GetUserName = async () => {
          await axios
            .get(Api)
            .then((res) => setName(res.data.user.name))
            .catch((err) => console.log(err));
        };
        GetUserName();
        duration = duration - 100
        return (
          <ProfileBlog
            key={_id}
            _id={_id}
            upperCasedTitle={upperCasedTitle}
            DeleteBlog={DeleteBlog}
            date={date}
            description={description}
            userName={name}
            duration={duration}
            Update_Blog={Update_Blog}
            processing={updating}
          />
        );
      })
    ) : (
      <div className="text-center">You don't have any blogs. <Link to={"/create"}><span className="text-blue-600 underline">Click Here to Create a Blog</span></Link></div>
    );
  return (
    <>
      <MY_NAV />
      <main className=" bg-slate-300 py-[3rem] min-h-[100vh]">
        <section className="max-w-[1200px] mx-auto">
          <h1 className="text-blue-900 text-center mb-[3rem]">
            Here are your blogs {userInfo.name}
          </h1>
          {!processing ? (
            <div className="flex flex-col-reverse gap-[2rem]">
              {BlogElements}
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="loader"></div>
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default ProfilePage;
