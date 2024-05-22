"use client"
import { useEffect, useState } from "react"
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import TYPE from "@/lib/type";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDatabase, faServer, faTrash ,faCube, faHome, faPalette } from '@fortawesome/free-solid-svg-icons';
import { FontawesomeObject, IconDefinition } from "@fortawesome/fontawesome-svg-core";

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

    const liStyle = `pl-4 w-full text-lg`;
    const first:dbListItem[] =[
        {
            name:!!!process.env.NEXT_PUBLIC_MONGO ? '연결' :'해제',
            href:!!!process.env.NEXT_PUBLIC_MONGO ? "/connect": '/disconnect'
        },
     
    ]
    const second:dbListItem[] = [
        {
            name:'DB 만들기',
            href:'/create',
            icon: faDatabase
        },
        {
            name:'DB 삭제',
            href:'/delete',
            icon:faTrash
        },
        {
            name:'Collection 만들기',
            href:'/collection/create',
            icon:faServer
        },
        {
            name:'Collection 삭제',
            href:'/collection/delete',
            icon:faTrash
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
        <nav className="navLeftContent overflow-y-scroll p-2 pr-3 pl-3 w-[225px]">
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
            <NavBox title={ 'MongoDB' } list={ first } icon={faHome}></NavBox>
            <NavBox title={ 'Control' } list={ second } icon={faPalette}></NavBox>
            <NavBox title={ 'DB 목록' } icon={ faDatabase }>
                {
                    dbList.map((v:dbListItem,i:number)=>{
                        return (
                            <li key={`li_${i}`} className={liStyle}>
                                {
                                    !! v.icon ?
                                    <FontAwesomeIcon icon={v.icon} />
                                    : null
                                }
                                <Link href={`/admin/${v.name}`} className={`text-lg`} onClick={dbListHandle}>
                                    {v.name}
                                </Link>
                            </li>
                        )
                    })
                }
            </NavBox>
            <NavBox title={ 'Collection 목록' } icon={faServer}>
                {
                    !! collectionList.length ?
                    collectionList.map((v:any,i:number)=>{
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
    icon?: IconDefinition;
}
type navBox = {
    title:any;
    children?:any;
    list? :dbListItem[];
    icon?: IconDefinition;
}
function NavBox(props:navBox) {
    return(
        <div className="navBox w-full mb-2 border-b pb-2">
            <h2 className={'text-xl font-black mb-2 text-white'}>
                {
                    !!props.icon ?
                    <FontAwesomeIcon icon={props.icon} className="mr-3 text-base"/>
                    :null
                }
                {props.title}
            </h2>
            <ul>
                {
                   !! props.list ?
                    props.list.map((v,i) => {
                        return(
                            <li key={ v.name+`_`+i } className={ `pl-4 mb-1 mt-1 w-full text-base` }>
                                {/* {
                                    !!v.icon ?
                                    <FontAwesomeIcon icon={v.icon} className="mr-2 text-sm"/>
                                    :null
                                } */}
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