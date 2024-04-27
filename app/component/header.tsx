"use client"
import { useEffect, useState } from "react";
import { getCookie } from "../util/cookie";
import Logo from "./logo";
import Link from "next/link";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import TYPE from "@/lib/type";

interface User {
    user:object
}
interface LoginBar {
    className?:string;
    href:string;
    children:React.ReactElement|string;
    onClick?:(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}
export default function Header () {
    const rightBarStyle =`font-base text-white text-base m-1 tracking-tighter w-full max-w-[60px] break-keep `;
    const dispatch =useDispatch();
    const loginToken:any = getCookie('l_token');
    let logininit:LoginBar = {
        className:"",
        href:"",
        children:"",
    }
    const [Login,setLogin] = useState([logininit])
    const user = useSelector((state:any) => state.user);

    function logout(e:React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        e.preventDefault();
        let body = {
            type:TYPE('logout').REQUEST,
            userId:user?.user.userId,
            l_token:loginToken
        }
        dispatch(body)
    }
    useEffect(()=>{
        if(!user) return 
        if(user.login && !user.loading)
        setLogin([
            {
                className:"",
                href:"/logout",
                children:"로그아웃",
                onClick:logout
            },
            {
                href:`/user/${user.user?.userId}`,
                children:'회원정보'
            }   
        ])
        else 
        setLogin([
            {
                className:"",
                href:'/login',
                children:"로그인"
            },
            {
                className:"",
                href:"/register",
                children:"회원가입"
            }
        ])
    },[user.login])

    useEffect(()=>{
    },[user])
    return(
        <header className="z-30 w-full top-0 relative">
            <div className="top-content flex justify-between w-screen z-20 bg-gray-950 min-h-[60px] pt-2 pb-2 pl-6 pr-6">
                <div className="logo">
                    <Logo className={"text-white"} />
                </div>
                <div className="search"></div>
                <div className="user flex justify-end items-center min-w-[225px]">
                    { Login.map((v,i)=>{
                        return <Link key={`login_bar_${i}`} className={rightBarStyle + v.className} href={v.href} onClick={v.onClick} >{v.children}</Link>
                        }) 
                    }
                </div>
            </div>
        </header>
    )
}