"use client"
import { useEffect, useState } from "react"
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import TYPE from "@/lib/type";

export default function Nav() {
    const [list,setList] = useState<any>([]);
    const dispatch = useDispatch();
    const adminNav = useSelector<any>((state)=>state.admin.nav)
    useEffect(()=>{
        let body = {
            bodyType:"collection"
        }
        dispatch({type:TYPE('admin_nav').REQUEST,...body})
    },[])
    
    useEffect(()=>{
        if(adminNav) setList(adminNav)
    },[adminNav])

    const liStyle = `pl-3 w-full text-lg`;
    const dbList:dbListItem[] = [{
            name:'create',
            href:'/admin/db/create'
        },
        {
            name:'delete',
            href:'/admin/db/delete',
        }
    ]       
    return(
        <nav className="navLeftContent overflow p-2 w-[225px]">
               <NavBox title={'DB'} list={dbList}>
                {/* <li className={liStyle}>
                    <Link href={``}>
                        create
                    </Link>
                </li> */}
            </NavBox>
            <NavBox title={'Collection'}>
                {
                    list.map((v:any,i:number)=>{
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
                    })
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
        <div className="navBox w-full mb-4">
            <h2 className={'font-black text-white'}>
                {props.title}
            </h2>
            <ul>
                {
                   !! props.list ?
                    props.list.map((v,i)=>{
                        return(
                            <li key={v.name} className={`pl-3 w-full text-lg`}>
                                <Link href={v.href}>
                                    {v.name}
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