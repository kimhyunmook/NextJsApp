"use client"
import { useEffect, useState } from "react";
import { getCookie } from "../util/cookie";
import Logo from "./logo";
import Link from "next/link";
import axios from "axios";
import { useSelector } from "react-redux";

interface User {
    user:object
}
export default function Header () {
    const rightBarStyle =`text-center font-normal text-sm mr-1 ml-1 tracking-tighter`;
    const loginChk:any = getCookie('l_token');
    const [Login,setLogin] =useState(<a>Loading</a>)
    const user = useSelector((state:User)=>state.user)
    console.log(user)
    async function logout(e:React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        e.preventDefault();
        try {
            let body = {
                userId:'d',
                l_token:loginChk
            }
            const res = await axios.post(`/api/users/logout`,body)
            .then(res=>res.data)
        } catch(error) {
            console.error(error)
        }
    }
    useEffect(()=>{
        if(!!loginChk)
        setLogin(<Link className={rightBarStyle} href={'/logout'} onClick={logout} >로그아웃</Link>)
        else 
        setLogin(<Link className={rightBarStyle} href={'/login'}>로그인</Link>)
    },[loginChk])
    return(
        <header className="w-full p-4 border-b mb-16">
            <div className="flex flex-wrap items-center justify-center">
                <div className="right-bar w-full flex justify-end">
                    {Login}
                    <Link className={rightBarStyle} href={'/register'}>회원가입</Link>
                </div>
                <div className="logobox">
                    <Logo />
                </div>
            </div>
        </header>
    )
}