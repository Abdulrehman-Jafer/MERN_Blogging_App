import { Dispatch } from "react"
export type ofuserInfo = { userId: string, name: string, blogs: string[] }
export type ofSignUpInfo = {
    name: string,
    email: string,
    password: string,
    confirm: string
}
export type  ofSign_Up_Handler = (event: React.FormEvent<HTMLFormElement>, signUpInfo: ofSignUpInfo, setSignUpInfo: Dispatch<ofSignUpInfo>) => Promise<void>
export type ofLogInInfo = {
    email: string,
    password: string
}
export type ofLog_In_Handler = (event: React.FormEvent<HTMLFormElement>, loginInfo: ofLogInInfo) => Promise<void>
export type Provider = {
    signUp: {
        processing: boolean,
        Sign_Up_Handler:ofSign_Up_Handler ;
    },
    logIn: {
        processing: boolean,
        Log_In_Handler: ofLog_In_Handler,
        userInfo: ofuserInfo
    };
    LOGOUT: () => void;
}
