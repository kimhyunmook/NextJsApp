"use client"
import style, { mobile_box } from "@/app/util/style";
import { adminDBInfoApi } from "@/lib/api/adminApi";
import { useEffect, useState } from "react";
import { title } from "@/app/util/style";
import { useDispatch, useSelector } from "react-redux";
import TYPE from "@/lib/type";
import Link from "next/link";
import util from "@/app/util/utils";

type Props = {
    params:{
        db:string
    }
}
export default function DBPage (props:Props) {
    const collection = useSelector((state:any)=>state.admin.navCollection);
    const dispatch = useDispatch();
    const [dbInfo,setDbInfo] = useState({key:[],value:[]});
    const [collList,setCollList] = useState([])
    const utils = util();

    let body ={};
    useEffect(()=>{
        body = {
            dbName:props.params.db,
        }
        adminDBInfoApi(body)
            .then((res:any)=>{
                if (res.ok) {
                    const keys:any = {
                        key: Object.keys(res.msg),
                        value: Object.values(res.msg)
                    } 
                    setDbInfo(keys);
                } 
            })

        body ={
            bodyType:'collection',
            dbName: props.params.db
        }
        dispatch({ type:TYPE('admin_nav_collection').REQUEST,...body});
    },[])
    useEffect(()=>{
        console.log(dbInfo)
        if (collection) setCollList(collection);
    },[collection])
    function convert (t:string) {
        switch(t) {
            case '_id' : 
                return 'Mongo_ID';
            case 'database_name':
                return 'DB 이름';
            case 'db_description':
                return 'DB 설명';
            case 'create_date':
                return '생성 날짜';
            default : 
                return t;
        }
    }
    const liStyle = `flex border-b border-r-0 border-l-0`;
    return (
        <ul className={`${mobile_box} pt-4`}>
            <li>
                <h2 className={title}>
                    DB Information
                </h2>
            </li>
            {
                dbInfo.key.length > 0 ?
                dbInfo.key.map((v,i)=>{
                    return(
                        <li key={`${v}`} className={`${liStyle} ${ i===0 ? 'border-t':''} `}>
                            <p className={`w-[30%] break-keep bg-zinc-700 p-4`}> 
                                { convert(v) } 
                            </p>
                            <p className="p-4">
                                {dbInfo.value[i]}
                            </p>
                        </li>
                    )
                }):
                <li className={liStyle + ' pb-2'}>
                    <h3 className="text-xl pl-2">없음</h3>
                </li>
            }
            <li className={liStyle+' w-full pt-4 flex-wrap'}>
                <h3 className={style.title_sm}>
                    Collections
                </h3>
                <ul className={'flex flex-wrap pb-2 pt-2'}>
                    {
                        collList.length > 0?
                        collList.map((v:any,i)=>{
                            return (
                                <li key={v.name} className=" min-w-[20%] text-center p-2 pr-4 pl-4 rounded-2xl m-2 mt-1 mb-1 text-lg bg-green-500">
                                    <Link href={``}>
                                        { utils.firstUppercase(v.name) }
                                    </Link>
                                </li>
                            )
                        }) :
                        <li>
                            <h3 className="text-xl pl-2">없음</h3>
                        </li>
                    }
                </ul>
            </li>
        </ul>
    )
}