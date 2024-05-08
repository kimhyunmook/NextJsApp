"use client";

import { useCallback, useEffect, useState } from "react"
import Btn from "../component/button";
import { absolute_center, absolute_y_center, flex_center, mobile_box, onepage, title } from "../util/style";
import { useDispatch,useSelector } from "react-redux";
import TYPE from "@/lib/type";
import Logo from "../component/logo";
import { useRouter } from "next/navigation";

type liType = {
    name:string;
    className?:string;
    label:string;
    children?:any;
    type?:string;
    value?:string;
    onChange?:React.ChangeEventHandler<HTMLInputElement>
    maxLength?:number;
    autoComplete?:string
    overflow?:boolean;
}
export function Li(props:liType):React.ReactElement{
    let round = `rounded-sm`;
    let overflow = !! props.overflow ? '' : 'overflow-hidden';
    if(!!props.children) round +=` rounded-r-none `
    const liStlye = ` w-full flex justify-between mb-3 mt-3 border border-blue-300 ${overflow} ${round} ${props.className} `;
    let att = {
        type:!!props.type ? props.type :"text",
        id:props.name, 
        name:props.name, 
        placeholder:props.label, 
        onChange:props.onChange, 
        autoComplete:props.autoComplete,
        value:props.value,
        maxLength:props.maxLength
    }

   return(
     <li className={liStlye}>
        <input className={`w-full h-10 p-3 ${round} `} 
        {...att}
        />
        {props.children}
     </li>
   ) 
}

export default function login ():React.ReactElement {
    const [userId,setUserId] =useState("");
    const [userPw,setUserPw] =useState("");
    const [allChk,setAllChk]= useState(false);
    const dispatch = useDispatch()
    const { user, login ,loading, error } = useSelector((state:any) => state.user);
    const router = useRouter()
    useEffect(()=>{
        if(login)
            router.push('/')
    },[login])

    const onChange = useCallback((e:React.ChangeEvent<HTMLInputElement>)=>{
        const t= e.target
        switch(e.target.id) {
            case 'userId':setUserId(t.value)
                break;
            case 'userPw':setUserPw(t.value);
                break;
        }
    },[])
    function LoginHandle (e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        let body ={
            type: TYPE('user').REQUEST,
            userId:userId,
            userPw:userPw
        }
        dispatch(body);
        if (login)
            router.push('/')
    }

    useEffect(()=>{
        if(!!userId && !!userPw) setAllChk(true)
        else setAllChk(false)
    },[userId,userPw])
  
    return (
        <form className={`login relative flex justify-center w-full max-w-[400px] p-5 h-full bg-white border-gray-500`} style={{}}>
            <div className={`${absolute_center} w-full max-w-[300px]`}>
                <Logo className={"w-full mb-4 text-center text-black text-5xl"} />
                {/* <h2 className={title}>로그인</h2> */}
                <ul className={`flex flex-wrap items-center justify-center w-full`}>
                    <Li name="userId" label="ID" onChange={onChange} autoComplete="username"></Li>
                    <Li name="userPw" label="PW" type="password"  onChange={onChange} autoComplete="current-password"></Li>
                    <li className="w-full mt-4">
                        <Btn className={!!allChk?"ml-auto" :"ml-auto bg-gray-300 border border-gray-400 text-gray-600"} onClick={allChk ? LoginHandle: (e:React.FormEvent<HTMLFormElement>)=>{e.preventDefault()}} >
                            Login
                        </Btn>
                    </li>
                </ul>
            </div>
        </form>
    )
}