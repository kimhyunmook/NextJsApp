'use client'
import Loading from "../loadingg"
import style, { flex_center, title } from "../util/style"
import { useEffect, useRef, useState } from "react";
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
        parent_db:'in DB',
        collection_name:'Collection 이름',
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
                <div className="contentbox flex flex-warp justify-around">
                    <Box title={'최근 생성된 DB'} label={dblabel} list={newdb}></Box>
                    <Box title={'최근 생성된 Collection'} label={colllabel} list={newcollection}></Box>
                </div>
            </div>
        </Loading>
    )
}


function Box ({children,title,className,label,list,full}:{children?:any,title:string,className?:string,label?:{},list:any[],full?:boolean}) {
    label = !!label ? label : {}; 
    full = !!full ? full : false;
    const labelValues = Object.values(label);
    const utils = util();
    console.log(list)
    return (
        <ul className={`box max-w-full md:max-w-[700px] ${full ? `w-full`:`w-[49%]`} ml-0 m-[2%] ${className}`}>
            <li>
                <h2 className={`text-xl font-black mb-2`}>
                    { title }
                </h2>
            </li>
            <li className={`${flex_center} w-full text-center bg-zinc-700`}>
                {
                    labelValues.map((v:any,i)=>{
                        return(
                            <div className="font-black p-2 pt-1 pb-1 w-full" key={`${v}`}>
                                { v }
                            </div>
                        )
                    })
                }
            </li>
            {
                list && list.length > 0 ?
                    list.map((v,i)=>{
                        console.log(v);
                        const name = v.database_name ? v.database_name : v.collection_name;
                        const href = `/admin${!!v.parent? "/"+v.parent:''}${'/'+name}`
                        delete v.type;
                        let value = Object.values(v);
                        let key = Object.keys(v);
                        return (
                            <li  className="flex" key={`${v}_${i}`}>
                                {
                                    value.map((v2:any,i2)=> {
                                        let style = {
                                            width:`${100/value.length}%`,
                                        }
                                        let att = {
                                            className:"text-center pt-1 pb-1 p-2 border-b" ,
                                        }
                                     
                                        if (key[i2]=== 'create_date')  {
                                            v2= utils.getDate(v2,'YY-MM-DD')
                                            return (
                                                <div
                                                    {...att}
                                                    style={style}
                                                    key={`${v2}_${i2}`}
                                                >
                                                    { v2 }
                                                </div>
                                            )
                                        }
                                        else {
                                            return(
                                                <Link
                                                    href={href}
                                                    key={`${v2}_${i2}`}
                                                    style={style}
                                                    {...att}
                                                >
                                                    { v2 }
                                                </Link>
                                            )
                                        }
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