"use client"
import axios from "axios";
import { useEffect, useState } from "react"
import Link from "next/link";

interface list {
    name:string
}
export default function Nav() {
    const [list,setList] = useState<list[]>([]);
    useEffect(()=>{
        axios.post('/api',{type:'collection'}).then(res=>{
            const data =res.data;
            setList(data.msg)
        });
    },[])
    return(
        <nav className="left-content bg-gray-950 min-h-screen flex flex-wrap p-2 w-[225px]">
            <div className="box w-full">
                <h2 className={`font-black text-white`}>Collection</h2>
                <ul>
                    {
                        list.map((v,i)=>{
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