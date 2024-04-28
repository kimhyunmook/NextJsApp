"use client"
import Loading from "@/app/loadingg"
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
    const userList = useSelector<any>((state)=>state.admin.userList)
    const storeLoading = useSelector<any>((state)=>state.admin.loading)
    const store = useSelector(state=>state);
    const [loading,setLoading] = useState<any>(true);
    useEffect(()=>{
        let body = {
            bodyType:'users'
        }
        dispatch({type:TYPE('admin_user').REQUEST,...body})  

    },[])
    useEffect(()=>{
        if (userList) 
            setList(userList);
    },[userList])

    useEffect(()=>{
        setLoading(storeLoading)
        console.log('dd',storeLoading)
    },[storeLoading])

    const {NoDiv,Grade,NameDiv,UserIdDiv,PNDiv,DateDiv,_li,Etc} = {
        _li:"flex text-center p-2 pr-0 pl-0 break-words ",
        NoDiv:"w-[8%]",
        Grade:'w-[12%]',
        NameDiv:'w-[12%]',
        UserIdDiv:'w-[15%]',
        PNDiv:'w-[18%]',
        DateDiv:'w-[15%]',
        Etc:"w-[10%]"
    }
    return(
        <Loading loading={storeLoading}>
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
                    <div className={Grade}>
                        등급
                    </div>
                    <div className={UserIdDiv}>
                        ID
                    </div>
                    <div className={NameDiv}>
                        이름
                    </div>
                    <div className={PNDiv}>
                        핸드폰번호
                    </div>
                    <div className={DateDiv}>
                        가입날짜
                    </div>
                    <div className={Etc}>etc</div>
                </li>
                {
                    list.length === 0 ? 
                    <li className="border-b">
                        <h2 className={`text-center p-3 text-2xl`}>
                            없음
                        </h2>
                    </li> :
                    list.map((v:any,i:number)=>{
                        const url = `./${v.userId}`
                        return (
                            <li className={_li+" border-b"} key={`user_li_${i}`}>
                                <Link href={url} className={NoDiv}>
                                    {v.userIndex}
                                </Link>
                                <div className={Grade}>
                                    일반회원
                                </div>
                                <Link href={url} className={UserIdDiv}>
                                    {v.userId}
                                </Link>
                                <Link href={url} className={NameDiv}>
                                    {v.userName}
                                </Link>
                                <div className={PNDiv}>
                                    {v.userPhoneNumber}
                                </div>
                                <div className={DateDiv}>
                                    {v.singUpDate}
                                </div>
                                <div className={Etc}>etc</div>
                            </li>
                        )
                    })
                }
            </ul>
        </Loading>
    )
}

