"use client"
import { title } from "@/app/util/style"
import TYPE from "@/lib/type"
import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

type Props = {

}
// type List = {
//     userName:string;
//     userId:string;
//     userPhoneNumber:string;
// }
export default function adminUsers (props:Props) {
    const [list,setList] = useState<any>([])
    const dispatch =useDispatch();
    const userList:any = useSelector<any>((state)=>state.admin.userList)

    useEffect(()=>{
        let body = {
            bodyType:'users'
        }
        dispatch({type:TYPE('admin_user').REQUEST,...body})
        if (userList) setList(userList);
    },[userList])

    const {NoDiv,NameDiv,UserIdDiv,PNDiv,DateDiv,_li} = {
        _li:"flex text-center p-2 pr-0 pl-0 break-words ",
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
                list.length ===0 ? 
                <li className="border-b">
                    <h2 className={`text-center p-3 text-2xl`}>
                        비어있음
                    </h2>
                </li> :
            
                list.map((v:any,i:number)=>{
                    const url = `./${v.userId}`
                    return (
                        <li className={_li+" border-b"} key={`user_li_${i}`}>
                            <Link href={url} className={NoDiv}>
                                {v.userIndex}
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
                                {v.singUpDate}
                            </div>
                            <div className={`w-[25%]`}>etc</div>
                        </li>
                    )
                })
            }
        </ul>
    )
}

