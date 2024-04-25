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
    const rightBarStyle =`text-center font-normal text-sm mr-1 ml-1 tracking-tighter `;
    const dispatch =useDispatch();
    const loginToken:any = getCookie('l_token');
    let logininit:LoginBar = {
        className:"",
        href:"",
        children:"",
    }
    const [Login,setLogin] = useState([logininit])
    const user = useSelector((state:any) => state.user);
    console.log(user)

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
        <header className="w-full p-4 border-b mb-16">
            <div className="flex flex-wrap items-center justify-center">
                <div className="right-bar w-full flex justify-end">
                    { Login.map((v,i)=>{
                        return <Link key={`login_bar_${i}`} className={rightBarStyle + v.className} href={v.href} onClick={v.onClick} >{v.children}</Link>
                        }) 
                    }
                </div>
                <div className="logobox">
                    <Logo />
                </div>
            </div>
        </header>
    )
}