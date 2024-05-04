"use client"
import { useEffect, useState } from "react"
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import TYPE from "@/lib/type";

export default function Nav() {
    const [collectionList,setCollectionList] = useState<any>([]);
    const [dbList,setDbList] = useState<any>([]);
    const dispatch = useDispatch();
    const db = useSelector<any>((state)=>state.admin.navDB)
    const collection = useSelector<any>((state)=>state.admin)
    useEffect(()=>{
        let body = {
            bodyType:"db"
        }
        dispatch({type:TYPE('admin_nav').REQUEST,...body})
    },[])
    
    useEffect(()=>{
        if(db) setDbList(db)
    },[db])

    const liStyle = `pl-3 w-full text-lg`;
    const oldList:dbListItem[] = [{
            name:'create',
            href:'/admin/db/collection/create'
        },
        {
            name:'delete',
            href:'/admin/db/collection/delete',
        }
    ]
    function dbListHandle (e:React.MouseEvent<HTMLAnchorElement>) {
        e.preventDefault();
        let body ={
            bodyType:'collection',
            dbName: e.currentTarget.textContent
        }
        console.log(body);
    }
    return(
        <nav className="navLeftContent overflow p-2 w-[225px]">
            <h2 className="font-black pt-2 pb-2 border-b mb-2">
                <Link href={`/admin/`}>
                    DATABASE 만들기
                </Link>
            </h2>
            <NavBox title={ 'DB' } list={ oldList }></NavBox>
            <NavBox title={ 'DB' } >
                {
                    dbList.map((v:any,i:number)=>{
                        let name = ""
                        switch(v.name) {
                        }
                        
                        return (
                            <li key={`li_${i}`} className={liStyle}>
                                <Link href={`/admin/${v.name}`} className={`text-lg`} onClick={dbListHandle}>
                                    {v.name}
                                </Link>
                            </li>
                        )
                    })
                }
            </NavBox>
            <NavBox title={ 'Collection' }>
                {
                    !! collectionList.length ?
                    collectionList.map((v:any,i:number)=>{
                        let name = ""
                        switch(v.name) {
                        }
                        
                        return (
                            <li key={`li_${i}`} className={liStyle}>
                                <Link href={`/admin/${v.name}`} className={`text-lg`}>
                                    {v.name}
                                </Link>
                            </li>
                        )
                    }) : 
                    <li className={liStyle}>
                        <Link href={"#"} className="text-base">
                            DB를 선택해주세요
                        </Link>
                    </li>
                }
            </NavBox>
         
        </nav>
    )
}
interface dbListItem {
    name:string;
    href:string;
}
type navBox = {
    title:any;
    children?:any;
    list? :dbListItem[];
}
function NavBox(props:navBox) {
    return(
        <div className="navBox w-full mb-2 border-b pb-2">
            <h2 className={'font-black text-white'}>
                {props.title}
            </h2>
            <ul>
                {
                   !! props.list ?
                    props.list.map((v,i) => {
                        return(
                            <li key={ v.name+`_`+i } className={ `pl-3 w-full text-lg` }>
                                <Link href={ v.href }>
                                    { v.name }
                                </Link>
                            </li>
                        )
                    })
                   :
                   props.children
                }
            </ul>
        </div>
    )
}