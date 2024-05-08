"use client"
import { useEffect, useState } from "react"
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import TYPE from "@/lib/type";

export default function Nav() {
    const [dbList,setDbList] = useState<any>([]);
    const [collectionList,setCollectionList] = useState<any>([]);
    const [dbName,setDbName] =useState<string|null>('');
    const dispatch = useDispatch();
    const db = useSelector<any>((state)=>state.admin.navDB)
    const collection = useSelector<any>((state)=>state.admin.navCollection)
    useEffect(()=>{
        let body = {
            bodyType:"db"
        }
        if (!! process.env.NEXT_PUBLIC_MONGO)
            dispatch({type:TYPE('admin_nav').REQUEST,...body});
    },[])
    
    useEffect(()=>{
        if(db) setDbList(db)
        if(collection) setCollectionList(collection)
        
    },[db,collection])

    const liStyle = `pl-3 w-full text-lg`;
    const first:dbListItem[] =[
        {
            name:!!!process.env.NEXT_PUBLIC_MONGO ? '연결' :'해제',
            href:!!!process.env.NEXT_PUBLIC_MONGO ? "/connect": 'disconnect'
        },
     
    ]
    const second:dbListItem[] = [
        {
            name:'DB Create',
            href:'/create'
        },
        {
            name:'DB Delete',
            href:'/delete'
        },
        {
            name:'Collection Create',
            href:'/collection/create'
        },
        {
            name:'Collection Delete',
            href:'/collection/delete',
        }
    ]
    function dbListHandle (e:React.MouseEvent<HTMLAnchorElement>) {
        // e.preventDefault();
        let body ={
            type:TYPE('admin_nav_collection').REQUEST,
            bodyType:'collection',
            dbName: e.currentTarget.textContent
        }
        setDbName(e.currentTarget.textContent);
        dispatch({...body})
    }
    const state = `w-[15px] h-[15px] mr-2 rounded-full`
    return(
        <nav className="navLeftContent overflow-y-scroll p-2 w-[225px]">
            <div className="connectState mb-4 bg-zinc-600 p-1 pl-2 max-w-[100px] rounded-md">
                {
                    !! process.env.NEXT_PUBLIC_MONGO ?
                    <div className={`w-full flex items-center`}>
                        <div className={state+" bg-green-500"}></div>
                        연결 중
                    </div> :
                    <div className={`w-full flex items-center`}>
                        <div className={state+ " bg-red-500"}></div>
                        연결 끊김
                    </div>
                }
            </div>
            <NavBox title={' MongoDB '} list={first}></NavBox>
            <NavBox title={ 'Control' } list={ second }></NavBox>
            <NavBox title={ 'DB List' } >
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
            <NavBox title={ 'CollectionList' }>
                {
                    !! collectionList.length ?
                    collectionList.map((v:any,i:number)=>{
                        let name = ""
                        switch(v.name) {
                        }
                        
                        return (
                            <li key={`li_${i}`} className={liStyle}>
                                <Link href={`/admin/${dbName}/${v.name}`} className={`text-lg`}>
                                    {v.name}
                                </Link>
                            </li>
                        )
                    }) : 
                    <li className={liStyle}>
                        <Link href={"#"} className="text-base">
                            없음
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
                                <Link href={ '/admin/mongodb/'+v.href }>
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