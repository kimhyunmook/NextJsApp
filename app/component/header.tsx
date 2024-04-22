"use client"
import { useEffect, useState } from "react";
import { getCookie } from "../util/cookie";
import Logo from "./logo";
import Link from "next/link";

export default function Header () {
    const rightBarStyle =`text-center font-normal text-sm mr-1 ml-1 tracking-tighter`;
    const loginChk:any = getCookie('l_token');
    const [Login,setLogin] =useState(<Link className={rightBarStyle} href={'/login'}>로그인</Link>)

    function logout(e:React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        e.preventDefault();
    }
    useEffect(()=>{
        if(!!loginChk)
        setLogin(<Link className={rightBarStyle} href={'/logout'} onClick={logout} >로그아웃</Link>)
    },[])
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