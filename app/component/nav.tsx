"use client"
import { ReactNode, useEffect, useState } from "react"
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import TYPE from "@/lib/type";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDatabase, faServer, faTrash ,faCube, faHome, faPalette } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { useParams } from "next/navigation";
import style from "../util/style";
import text from "../language/ko-kr/nav";

export default function Nav() {
    const [dbList,setDbList] = useState<any>([]);
    const [collectionList,setCollectionList] = useState<any>([]);
    const [dbName,setDbName] = useState<string|null>('');
    const dispatch = useDispatch();
    const db = useSelector<any>((state)=>state.admin.navDB)
    const collection = useSelector<any>((state)=>state.admin.navCollection)
    const params = useParams();

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

    //setting list array
    const settingObj:dbListItem[] =[
        {
            name:!!!process.env.NEXT_PUBLIC_MONGO ? text.connect : text.disconnect,
            href:!!!process.env.NEXT_PUBLIC_MONGO ? "/connect": '/disconnect',
            className:`border-l-4 ${style.green_border} pl-2 block `
        },
        {
            name:text.homepage_setting,
            href:"/homepage",

        },
        {
            name:text.db_create,
            href:'/create',
        },
        {
            name:text.db_delete,
            href:'/delete',
        },
        {
            name:text.collection_create,
            href:'/collection/create',
        },
        {
            name:text.collection_delete,
            href:'/collection/delete',
        }
    ]
    
    // db바꿀 때마다 collection dispatch
    function dbListHandle (e:React.MouseEvent<HTMLAnchorElement>) {
        let body ={
            type:TYPE('admin_nav_collection').REQUEST,
            bodyType:'collection',
            dbName: e.currentTarget.textContent
        }
        setDbName(e.currentTarget.textContent);
        dispatch({...body})
    }
    const state = `w-[15px] h-[15px] mr-2 rounded-full`;
    const select = `transition font-bold ${style.green_bg} mt-1 mb-1 block max-w-[95%] pl-2 rounded-md`;
    return(
        <nav className="navLeftContent overflow-y-scroll p-2 pr-3 pl-3 w-[225px]">
            <div className="connectState mb-4 bg-zinc-600 p-1 pl-2 max-w-[100px] rounded-md">
                {
                    !! process.env.NEXT_PUBLIC_MONGO ?
                    <div className={`w-full flex items-center`}>
                        <div className={`${state} ${style.green_bg}`}></div>
                        연결 중
                    </div> :
                    <div className={`w-full flex items-center`}>
                        <div className={state+ " bg-red-500"}></div>
                        연결 끊김
                    </div>
                }
            </div>

            <NavBox title={ 'Setting' } list={ settingObj } icon={ faCube }></NavBox>
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
                                <Link href={`/admin/${v.name}`} className={`text-lg ${params.db===v.name ? select:null}`} onClick={dbListHandle}>
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
                                <Link href={`/admin/${dbName}/${v.name}`} className={`text-lg ${params.collection=== v.name ? select:null}`}>
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
    className?:string;
    icon?: IconDefinition;
}
type navBox = {
    title:any;
    children?:any;
    list? :dbListItem[];
    icon?: IconDefinition;
}
function NavBox(props:navBox) {
    const path = window.location.pathname.split('/').reduce((a:string[],c:string,i)=>{
        if (!!c && c!=='admin' && c!=='mongodb') a.push(c);
        return a
    },[]);
 
    return(
        <div className="navBox w-full mb-2 border-b pb-2">
            <h2 className={'text-xl font-black mb-2 text-white'}>
                {
                    !! props.icon ?
                    <FontAwesomeIcon icon={props.icon} className="mr-3 text-base"/>
                    :null
                }
                { props.title }
            </h2>
            <ul>
                {
                   !! props.list ?
                    props.list.map((v,i) => {
                        return(
                            <li key={ v.name+`_`+i } className={ `pl-4 mb-1 mt-1 w-full text-base` }>
                                <Link href={ '/admin/mongodb/'+v.href } className={`${v.className}`}>
                                    { v.name }
                                </Link>
                            </li>
                        )
                    })
                   : props.children
                }
            </ul>
        </div>
    )
}