"use client"
import { useEffect, useState } from "react"
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import TYPE from "@/lib/type";
interface state {
    data:any[]
}
export default function Nav() {
    const [list,setList] = useState<any>([]);
    const dispatch = useDispatch();
    const adminNav = useSelector<any>((state)=>state.admin.nav)
    useEffect(()=>{
        let body = {
            bodyType:"collection"
        }
        dispatch({type:TYPE('admin_nav').REQUEST,...body})
        if(adminNav) setList(adminNav)
    },[])
    return(
        <nav className="left-content bg-gray-950 min-h-screen flex flex-wrap p-2 w-[225px]">
            <div className="box w-full">
                <h2 className={`font-black text-white`}>Collection</h2>
                <ul>
                    {
                        list.map((v:any,i:number)=>{
                            let name = ""
                            switch(v.name) {
                            }
                            
                            return (
                                <li key={`li_${i}`} className={`pl-2 text-white w-full text-lg`}>
                                    <Link href={`/admin/${v.name}`} className={`text-lg`}>
                                        {v.name}
                                    </Link>
                                </li>
                            )
                        })
                    }
                 
                </ul>
            </div>
        </nav>
    )
}