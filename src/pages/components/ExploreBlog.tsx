import React from "react";

const ExploreBlog = ({ upperCasedTitle, date, description, userName,duration=500 }: { upperCasedTitle: string, date: string, description: string, userName: string,duration:number }) => {
const style = {
  animation: `transformX100rem ${duration}ms linear`
}

return (
  <div className={"flex flex-col gap-[0.3rem] boxShadow p-[1rem]"} style={style}>
    <h3 className="text-blue-400">{upperCasedTitle}</h3>
    <small className="text-gray-400">
      Published on: {date.slice(0, 10)}{" "}
    </small>
    <p>{description}</p>
    <small className="self-end">
      <span className="font-semibold text-slate-400 bg-slate-200 rounded-md p-[0.1rem]">{`by ${userName}`}</span>
    </small>
  </div>
);
};

export default ExploreBlog;
