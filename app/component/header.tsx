"use client"
import { useEffect, useState } from "react";
import { getCookie } from "../util/cookie";
import Logo from "./logo";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import TYPE from "@/lib/type";
import MyIcons from "@/lib/fontawsome";


interface User {
    user:object
}
interface LoginBar {
    className?:string;
    href:string;
    children:React.ReactElement|string;
    onClick?:(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}
export default function Header ({logo}:{logo?:string|null}) {
    const rightBarStyle =`font-base text-white text-lg m-1 tracking-tighter w-full max-w-[45px] text-center break-keep `;
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
        if (!user) return 
        if (user.login && !user.loading)
            setLogin([
                {
                    className:"mr-2",
                    href:"/logout",
                    children:<MyIcons icon={'logout'} tooltip={'로그아웃'}/>,
                    onClick:logout
                },
                {
                    href:`/user/${user.user?.userId}`,
                    children:<MyIcons icon={'user'} tooltip={'회원정보'}/>,

                }   
            ])
        else 
            setLogin([
                {
                    className:"",
                    href:'/login',
                    children:<MyIcons icon={'login'} tooltip={'로그인'}/>
                },
                {
                    className:"",
                    href:"/signup",
                    children:<MyIcons icon={'user-plus'} tooltip={'회원가입'}/>

                }
            ])
    },[user.login])

    function navEvent(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        const nav = document.querySelector('.navLeftContent')
        const active = nav?.className.includes('active');
        if(active) nav?.classList.remove('active')
        else  nav?.classList.add('active');
    }
    return(
        <header className="z-30 w-full top-0 relative">
            <div className="topContent flex justify-between w-screen z-20 min-h-[60px] pt-2 pb-2 pl-4 pr-4">
                <div className="leftContent flex">
                    <button className="navBtn flex w-[30px] mr-2 text-3xl" onClick={navEvent}> ☰ </button>
                    <Logo text={ logo } className={"text-white"} />
                </div>
            
                <div className="user flex justify-end items-center min-w-[225px] mr-[55px]">
                    { Login.map((v,i)=> <Link key={`login_bar_${i}`} className={rightBarStyle + v.className} href={v.href} onClick={v.onClick} >{v.children}</Link>) }
                </div>
            </div>
        </header>
    )
}