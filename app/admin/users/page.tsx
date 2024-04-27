"use client"
import { title } from "@/app/util/style"
import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"

type Props = {

}
type List = {
    userName:string;
    userId:string;
    userPhoneNumber:string;
}
export default function adminUsers (props:Props) {
    const [list,setList] = useState<List[]>([])
    useEffect(()=>{
        axios.post('/api',{ type:'users' })
            .then(res=>{
                const data = res.data;
                setList(data.msg)
            });
    },[])
    const {NoDiv,NameDiv,UserIdDiv,PNDiv,DateDiv,_li} = {

        _li:"flex text-center p-2 pr-0 pl-0",
        NoDiv:"w-[10%]",
        NameDiv:'w-[10%]',
        UserIdDiv:'w-[15%]',
        PNDiv:'w-[20%]',
        DateDiv:'w-[20%]',
    }
    return(
        <ul className={`m-auto w-[90%] h-[120vh] mt-4 rounded-lg overflow-hidden`}>
            <li>
                <h2 className={`${title}`}>
                    Users
                </h2>
            </li>
            <li className={_li + " bg-gray-500  text-white"}>
                <div className={NoDiv}>
                    No.
                </div>
                <div className={NameDiv}>
                    이름
                </div>
                <div className={UserIdDiv}>
                    ID
                </div>
                <div className={PNDiv}>
                    핸드폰번호
                </div>
                <div className={DateDiv}>
                    가입날짜
                </div>
                <div className={`w-[25%]`}>etc</div>
            </li>
            {
                list.map((v,i)=>{
                    const url = `./${v.userId}`
                    return (
                        <li className={_li+" border-b"} key={`user_li_${i}`}>
                            <Link href={url} className={NoDiv}>
                                {i+1}
                            </Link>
                            <Link href={url} className={NameDiv}>
                                {v.userName}
                            </Link>
                            <Link href={url} className={UserIdDiv}>
                                {v.userId}
                            </Link>
                            <div className={PNDiv}>
                                {v.userPhoneNumber}
                            </div>
                            <div className={DateDiv}>
                                가입날짜
                            </div>
                            <div className={`w-[25%]`}>etc</div>
                        </li>
                    )
                })
            }
        </ul>
    )
}

