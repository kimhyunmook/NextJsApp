'use client'
import Loading from "../loadingg"
import style, { flex_center, title } from "../util/style"
import { useEffect, useRef, useState } from "react";
import { adminHomeApi, init } from "@/lib/api/adminApi";
import util from "../util/utils";
import Link from "next/link";
import { homeUser } from "../api/db/home/route";

type Props = {

}
const [dblabel,colllabel,userlabel]:[any,any,homeUser] = [
    {
        database_name:'DB 이름',
        create_date:'생성날짜',
    },
    {
        parent_db:'in DB',
        collection_name:'Collection 이름',
        create_date:'생성날짜'
    },
    {
        userId:'ID',
        userName:'이름',
        userPhoneNumber:'연락처',
        singUpDate:'가입날짜'
    }
]
export default function homeAdmin(props:Props) {
    // const store = useSelector((state)=>state);
    const [newdb,setNewdb] = useState([]);
    const [newcollection,setNewcollection] = useState([]);
    const [newuser,setNewuser] = useState([]);

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
            setNewuser(newUser)
            init();
        });
    },[])
    return(
        <Loading loading={null}>
            <div className="p-4 m-auto md:max-w-[1200px]">
                <h2 className={title}>
                    ADMIN PAGE
                </h2>
                <div className="contentbox flex flex-wrap justify-between">
                    <Box title={'New Database'} label={dblabel} list={newdb}></Box>
                    <Box title={'New Collection'} label={colllabel} list={newcollection}></Box>
                    <Box title={'New USER'} label={userlabel} list={newuser} full={true} link={false}></Box>
                </div>
            </div>
        </Loading>
    )
}


function Box ({children,title,className,label,list,full,link=true}:{children?:any,title:string,className?:string,label?:{},list:any[],full?:boolean,link?:boolean}) {
    label = !!label ? label : {}; 
    full = !!full ? full : false;
    const labelValues = Object.values(label);
    const utils = util();
    return (
        <ul className={`box max-w-full  ${full ? `w-full`:`w-[46%]`} m-[2%] ${className}`}>
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
                        const name = v.database_name ? v.database_name : v.collection_name;
                        const href = link ? `/admin${!!v.parent? "/"+v.parent:''}${'/'+name}`:'#'
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
                                            style:style
                                        }
                                     
                                        if (key[i2]=== 'create_date')  {
                                            v2= utils.getDate(v2,'YY-MM-DD')
                                            return (
                                                <div
                                                    {...att}
                                                    key={`${v2}_${i2}`}
                                                >
                                                    { v2 }
                                                </div>
                                            )
                                        }
                                        else {
                                            return(
                                                <div {...att}>
                                                    <Link
                                                        href={href}
                                                        key={`${v2}_${i2}`}
                                                    >
                                                        { v2 }
                                                    </Link>
                                                </div>
                                            )
                                        }
                                    })
                                }
                            </li>
                        )
                    }) 
                    : <Loading loading={ !!list } >
                        <ul className={flex_center}>
                            <li className="h-full text-xl">없음</li>
                        </ul>
                    </Loading>
            }
            { children }
        </ul>
    )
}