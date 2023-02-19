import { ChangeEvent, Dispatch } from "react";

// const hostingSiteUrl = "https://myexpressapi.onrender.com";
export const LOGIN_URL_API = `https://myexpressapi.onrender.com/api/user/login`;
export const SIGN_UP_URL_API = `https://myexpressapi.onrender.com/api/user/signup`;
export const GET_ALL_BLOGS = `https://myexpressapi.onrender.com/api/blog/`;
export const CREATE_BLOG = `https://myexpressapi.onrender.com/api/blog/add/`;
export const USER_BY_ID = `https://myexpressapi.onrender.com/api/user/`;
export const userBlogs_API = `https://myexpressapi.onrender.com/api/blog/user/`;
export const DeleteBlog_API = `https://myexpressapi.onrender.com/api/blog/`;
export const UPDATE_BLOG_API = `https://myexpressapi.onrender.com/api/blog/update/`;
import { RefObject } from "react";
export const style = {
  animation: `transformX100rem 300ms linear`,
};

export const onChangeHandler = (
  event: ChangeEvent,
  stateSetter: Dispatch<any>
) => {
  const { name, value } =
    (event.target as HTMLInputElement) || HTMLTextAreaElement;
  stateSetter((old: any) => {
    return { ...old, [name]: value };
  });
};

export const PressEnter = (formRef: RefObject<HTMLFormElement>) => {
  formRef.current?.addEventListener("keypress", (e) => {
    if (e.key === "enter") {
      return formRef.current?.submit();
    }
  });
};

export const Capitalizer = (string: string) => {
  const array = string.split(" ");
  return array
    .map((word) => {
      const upperCased = word[0].toLocaleUpperCase();
      return word.replace(word[0], upperCased);
    })
    .join(" ");
};
export const specialCharaters = [
  "@",
  "!",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "_",
  "-",
  "+",
  "=",
  "~",
  "`",
  "`",
  "{",
  "}",
  "[",
  "]",
  '",|',
  "<",
  ">",
  "?",
  "<",
  "/",
  ">",
];
