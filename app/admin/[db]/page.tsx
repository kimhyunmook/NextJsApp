"use client"
import style, { flex_center, mobile_box } from "@/app/util/style";
import { adminDBInfoApi, collectionInit, mongoConnect } from "@/lib/api/adminApi";
import { useEffect, useState } from "react";
import { title } from "@/app/util/style";
import { useDispatch, useSelector } from "react-redux";
import TYPE from "@/lib/type";
import Link from "next/link";
import util from "@/app/util/utils";
import Loading from "@/app/loadingg";
import { useRouter } from "next/navigation";
import { CollectionDelete } from "../mongodb/collection/[type]/delete";

type Props = {
    params:{
        db:string
    }
}
const liStyle = `flex border-b border-r-0 border-l-0`;
export default function DBPage (props:Props) {
    const params = props.params;
    const collection = useSelector((state:any)=>state.admin.navCollection);
    const loading = useSelector((state:any)=>state.admin.loading) 
    const [load,setLoad] = useState(false);
    const dispatch = useDispatch();
    const [collList,setCollList] = useState([])
    const utils = util();
    const router = useRouter();
    let body ={};

    // collection list
    useEffect(()=>{
        body ={
            bodyType:'collection',
            dbName: props.params.db
        }
        dispatch({ type:TYPE('admin_nav_collection').REQUEST,...body});
    },[])

    useEffect(()=>{
        if (!!collection) {
            setCollList(collection);
        } 
    },[collection])

    useEffect(()=>{
        setCollList([]);
    },[params])

    // loading
    useEffect(()=>{
        setLoad(loading);
    },[loading])
    
    const controlBtn = ['edit','delete']
    function controlBtnHandle (e:React.MouseEvent<HTMLAnchorElement>) {
        e.preventDefault();
        const href= e.currentTarget.href;
        switch(true) {
            case href.includes('edit') :
                router.push(`/admin/${params.db}/edit`)
                break;
            case href.includes('delete') :
                if (window.confirm('정말로 삭제하시겠습니까? \ndata는 전부 삭제됩니다.')) {

                    body ={
                        type:'delete',
                        dbName: params.db
                    }
                    mongoConnect(body).then(res=>{
                        if (res.ok) {
                            alert(res.msg);
                            dispatch({type:TYPE('admin_nav').REQUEST,bodyType:'db'});
                            router.push('/admin')
                        }
                        else {

                        }
                    })
                }
                break;
        }
    }
    const [deltriger,setDeltriger] = useState(false);
    function collectionDelete (e:React.MouseEvent) {
        e.preventDefault();
        if (deltriger) return setDeltriger(false)
        setDeltriger(true)
    }
    function collectionDleteTarget (cn:any) {
        let body:collectionInit ={
            dbName:params.db,
            collectionName: cn
        }
        CollectionDelete(body,()=>{
            let body2 = {
                bodyType:"collection",
                dbName:params.db
            }
            dispatch({type:TYPE('admin_nav').REQUEST,...body2});
        })
    }
    let condi = params.db !=='dev' && params.db !=='admin' && params.db !=='users';
    let link_collection = 'mr-2'
    return (
        <ul className={`${mobile_box} pt-4`}>
            <li>
                <h2 className={title}>
                    DB Information
                </h2>
            </li>
            <li className={`flex items-end justify-end`}>
                {
                    condi ?
                    controlBtn.map((v,i)=>{
                        return(
                            <Link key={`${v}_${i}`} href={v} className={`m-2`} onClick={controlBtnHandle}>
                                { utils.firstUppercase(v) }
                            </Link>
                        )
                    }): <p className="text-sm text-red-400 mb-4">수정할 수 없는 DATABASE</p>
                }
            </li>
            <DBInfoList dbName={params.db} ></DBInfoList>
            <li className={liStyle+' w-full pt-4 flex-wrap'}>
                <h3 className={style.title_sm}>
                    Collections
                </h3>
                <ul className={'flex flex-wrap pb-2 pt-2 w-full'}>
                    <li className="w-full flex justify-end mb-4">
                        {
                            params.db !=='users' ?
                            <>
                                <Link className={link_collection} href={`/admin/mongodb/collection/create?target=${params.db}`}>
                                    Create
                                </Link>
                                <Link className={link_collection} href={'#'} onClick={collectionDelete}>
                                    {
                                        deltriger ? 'Close' : 'Delete'
                                    }
                                </Link>
                            </>:
                            <p className="text-sm text-red-400 mb-2">수정할 수 없는 DATABASE</p>
                        }
                    </li>
                    {
                        //// <li>
                        collList.length > 0?
                            collList.map((v:any,i)=>{
                                return (
                                    <li key={v.name} className="min-w-[20%] text-center p-2 pr-4 pl-4 rounded-2xl m-2 mt-1 mb-1 text-lg bg-green-500">
                                        {
                                            deltriger ?
                                            <div className={flex_center}>
                                                <Link className="block" href={`/admin/${params.db}/${v.name}`}>
                                                    { utils.firstUppercase(v.name) }
                                                </Link> 
                                                <button 
                                                    onClick={(e)=>{
                                                        e.preventDefault();
                                                        const t = e.currentTarget.previousSibling?.textContent?.toLocaleLowerCase()
                                                        collectionDleteTarget(t)
                                                    }}
                                                    className="text-base font-black ml-3 pr-1 pl-1 bg-black text-red-500 hover:bg-white hover:text-blue-700"
                                                >
                                                    X
                                                </button>
                                            </div>
                                            :
                                            <Link className="block" href={`/admin/${params.db}/${v.name}`}>
                                                { utils.firstUppercase(v.name) }
                                            </Link>
                                            
                                        }
                                    </li>
                                )
                            }) :
                        <li className="w-full">
                            <Loading loading={collList.length <=0}>
                                <h3 className="text-xl pl-2">없음</h3>
                            </Loading>
                        </li>

                    }
                </ul>
            </li>
        </ul>
    )
}

export function DBInfoList ({dbName,type}:
    {dbName:string,type?:string}) {

    const [data,setDbInfo] = useState({key:[],value:[]});
    const utils =util();
    useEffect(()=>{
        let body = {
            dbName,
        }
        adminDBInfoApi(body)
            .then((res:any)=>{
                if (res.ok) {
                    res.msg.create_date = utils.getDate(res.msg.create_date);
                    if (type ==='edit')
                    delete res.msg.fix_date;
                    const keys:any = {
                        key: Object.keys(res.msg),
                        value: Object.values(res.msg)
                    } 
                    setDbInfo(keys);
                }
            })
            
        },[])
        

    return (
        <>
            {
                data.key.length > 0 ?
                data.key.map((v,i)=>{
                    const condi =  v ==="create_date" || v ==='_id';
                    return(
                        <li key={`${v}`} 
                        className={`${liStyle} ${ i===0 ? 'border-t':''} 
                        ${type ==='edit' ?
                            condi ?  
                                  ' hidden border-black' :' border-black' : ''} `}>
                            {
                                type !== 'edit' ? 
                                <>
                                    <p className={`w-[30%] min-w-[120px] break-keep bg-zinc-700 p-4`}> 
                                        { convert(v) } 
                                    </p>
                                    <p className="p-4">
                                        { data.value[i] }
                                    </p>
                                </>:    
                                <>
                                    <p className={`bg-blue-400 font-black w-[30%] break-keep p-4`}>
                                        { convert(v) }
                                    </p>
                                    <div className="w-[70%]">
                                        <input 
                                        name={v} 
                                        className={`${v==='database_name' ? style.disable_color : 'bg-white text-black'} w-full p-4`} 
                                        type={
                                            condi ?
                                            'hidden' : 'text' 
                                        } 
                                        disabled={v==='database_name' ? true :false }
                                        defaultValue={data.value[i]} />
                                    </div>
                                </>
                            }
                        </li>
                    )
                }):
                <Loading loading={data.key.length <= 0}>
                    <li className={liStyle + ' pb-2'}>
                        <h3 className="text-xl pl-2">없음</h3>
                    </li>
                </Loading>
            }
        </>
    )
    
}

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
        case 'fix_date': 
            return '수정 날짜';
        default : 
            return t;
    }
}