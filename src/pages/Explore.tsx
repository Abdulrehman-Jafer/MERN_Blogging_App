import React, { useEffect, useState } from "react";
import MY_NAV from "./components/MyNav";
import axios from "axios";
import { GET_ALL_BLOGS, Capitalizer } from "../Globals/Globals";
import ExploreBlog from "./components/ExploreBlog";




const Explore = () => {
  const [blogs, setBlogs] = useState([]);
  const [processing, setProcessing] = useState(false);
  useEffect(() => {
    const GetAllBlogs = async () => {
      setProcessing(true);
      await axios
        .get(GET_ALL_BLOGS)
        .then((res) => {
          setBlogs(res.data.blogs);
          setProcessing(false);
        })
        .catch((err) => {
          console.log(err);
          return setProcessing(false);
        });
    };
    GetAllBlogs();
  }, []);
  let duration = 200 * blogs.length;
  const BlogElements = blogs.map(
    ({ _id, title, description, date, userName }) => {
      const upperCasedTitle = Capitalizer(title);
      duration = duration - 100
      return (
        <ExploreBlog
          key={_id}
          upperCasedTitle={upperCasedTitle}
          date={date}
          description={description}
          userName={userName}
          duration={duration}
        />
      );
    }
  );
  return (
    <>
      <MY_NAV />
      <main className=" bg-slate-300 py-[3rem] min-h-[100vh] ">
        <section className="max-w-[1200px] mx-auto">
          <h1 className="text-blue-900 text-center mb-[3rem]">
            Here are the some latest blogs!
          </h1>
          {!processing ? (
            <div className="flex flex-col-reverse gap-[2rem]">
              {BlogElements ? BlogElements : "We Dont Have any Blogs Yet"}
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

export default Explore;
