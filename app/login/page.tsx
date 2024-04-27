"use client";

import { useCallback, useEffect, useState } from "react"
import Btn from "../component/button";
import { absolute_center, flex_center, mobile_box, onepage, title } from "../util/style";
import { useDispatch,useSelector } from "react-redux";
import TYPE from "@/lib/type";

type liType = {
    name:string
    label:string
    children?:React.ReactElement
    type?:string
    onChange?:React.ChangeEventHandler<HTMLInputElement>
}
export function Li(props:liType):React.ReactElement{
    let round = `rounded-sm`;
    if(!!props.children) round +=` rounded-r-none `
    const liStlye = ` w-full flex justify-between mb-2 mt-2 border border-blue-300 overflow-hidden ${round} `;

   return(
     <li className={liStlye}>
        <input className={`w-full h-10 p-3 ${round} `} 
        type={!!props.type ? props.type :"text"} 
        id={props.name} 
        name={props.name} 
        placeholder={props.label} 
        onChange={props.onChange} />
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
    }
    useEffect(()=>{
      if(!!userId && !!userPw) setAllChk(true)
      else setAllChk(false)
    },[userId,userPw])
  
    return (
        <form className={`login onepage relative w-full max-w-[500px] p-5 rounded-md m-auto top-36 border border-gray-500`} style={{}}>
            <h2 className={title}>로그인</h2>
            <ul className={`flex flex-wrap items-center justify-center w-full`}>
                <Li name="userId" label="ID" onChange={onChange}></Li>
                <Li name="userPw" label="PW" type="password" onChange={onChange}></Li>
                <li className="w-full mt-4">
                    <Btn className={!!allChk?"ml-auto" :"ml-auto bg-gray-300"} onClick={allChk ? LoginHandle: (e:React.FormEvent<HTMLFormElement>)=>{e.preventDefault()}} >
                        Login
                    </Btn>
                </li>
            </ul>
        </form>
    )
}