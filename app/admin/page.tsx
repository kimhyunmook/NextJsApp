'use client'
import Loading from "../loadingg"
import style, { flex_center, title } from "../util/style"
import { useEffect, useState } from "react";
import { adminHomeApi } from "@/lib/api/adminApi";
import util from "../util/utils";
import Link from "next/link";

type Props = {

}
const [dblabel,colllabel] = [
    {
        database_name:'DB 이름',
        create_date:'생성날짜',
    },
    {
        collection_name:'collection 이름',
        create_date:'생성날짜'
    }
]
export default function homeAdmin(props:Props) {
    // const store = useSelector((state)=>state);
    const [newdb,setNewdb] = useState([]);
    const [newcollection,setNewcollection] = useState([]);
    const utils = util();

    useEffect(()=>{
        adminHomeApi()
        .then(res=>{
            const {newDB, newCollection, newUser} = {
                newDB:res.msg.newDB.map((v:any)=>{
                    delete v._id;
                    delete v.db_description;
                    return {
                        ...v,
                        create_date: utils.getDate(v.create_date),
                    };
                }),
                newCollection:res.msg.newCollection,
                newUser:res.msg.newUser
            }
       
            setNewdb(newDB)
            setNewcollection(newCollection)
        });
    },[])
    return(
        <Loading loading={null}>
            <div className="p-4">
                <h2 className={title}>
                    ADMIN Page
                </h2>
                <div className="contentbox flex flex-warp">
                    <Box title={'최근 생성된 DB'} label={dblabel} list={newdb}></Box>
                    <Box title={'최근 생성된 Collection'} label={colllabel} list={newcollection}></Box>
                </div>
            </div>
        </Loading>
    )
}


function Box ({children,title,className,label,list}:{children?:any,title:string,className?:string,label?:{},list:any[]}) {
    label = !!label ? label : {}; 
    const labelValues = Object.values(label);
    const utils = util();
    return (
        <ul className={`box min-w-[49%] ml-0 m-[2%] ${className}`}>
            <li>
                <h2 className={`text-xl font-bold mb-2`}>
                    { title }
                </h2>
            </li>
            <li className={`${flex_center} w-full bg-zinc-700`}>
                {
                    labelValues.map((v:any,i)=>{
                        return(
                            <div className="p-2 pt-1 pb-1 w-full" key={`${v}`}>
                                { v }
                            </div>
                        )
                    })
                }
            </li>
            {
                list && list.length > 0 ?
                    list.map((v,i)=>{
                        let value = Object.values(v);
                        let key = Object.keys(v);
                        return (
                            <li  className="flex" key={`${v}_${i}`}>
                                {
                                    value.map((v2:any,i2)=> {
                                        if (key[i2]=== 'create_date') 
                                            v2= utils.getDate(v2,'MM-DD')
                                        return(
                                            <Link
                                                href={`/admin/${ v2 }`}
                                                className="pt-1 pb-1 p-2 border-b" 
                                                style={{width:`${100/value.length}%`}} 
                                                key={`${v2}_${i2}`}>
                                                { v2 }
                                            </Link>
                                        )
                                    })
                                }
                            </li>
                        )
                    }) : <Loading loading={list.length > 0} />
            }
            { children }
        </ul>
    )
}