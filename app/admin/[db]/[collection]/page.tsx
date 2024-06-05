"use client"
import Loading from "@/app/loadingg"
import { flex_center, title } from "@/app/util/style"
import TYPE from "@/lib/type"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { adminDataDeleteApi, collectionReName, adminCollectionRename } from "@/lib/api/adminApi"
import Link from "next/link"
import { useRouter } from "next/navigation"
import util from "@/app/util/utils"
import { ErrorMsg } from "../../mongodb/collection/[type]/page"
import MyIcons from "@/lib/fontawsome"

type Props = {
    params:{
        db:string | null | undefined;
        collection: string | null | undefined;
    }
    data:any
}
const {_li,long,midle,small,_default,etc} = {
    _li:"flex text-center p-2 pr-0 pl-0 break-words justify-between",
    long:"w-full max-w-[18%]",
    midle:"w-full max-w-[12%]",
    small:"w-full max-w-[7%]",
    _default:"w-full",
    etc: "etc w-full max-w-[5%] order-9"
}
export default function AdminDataTable (props:Props) {
    // const target = props.params.collection
    const params = props.params;
    const [list,setList] = useState<any>([])
    const dispatch =useDispatch();
    const datas: any = useSelector<any>((state)=>state.admin.datas);
    const storeLoading = useSelector<any>((state)=>state.admin.loading) && list.length > 0
    const [key,setKey] =  useState<any>([]);
    const [label,setLabel] =  useState<any>([]);
    const  [rename,setRename] = useState(false);
    const  [renameValue,setRenameValue] = useState<any>(null);
    const renameInput = useRef(null);
    const router = useRouter();
    const utils = util();
    const [errorMsg,setErrorMsg] = useState(true);    

    useEffect(()=>{
        let body = {
            bodyType:'collection_target',
            dbName:params.db,
            collectionName:params.collection,
        }   
        dispatch({type:TYPE(`admin_collection_target`).REQUEST,...body})     
    },[])
    useEffect(()=>{
        if (!!datas) {
            delete datas.label.userPw;
            const keys = datas.label;
            setKey(Object.keys(keys));
            setLabel(Object.values(keys));
            setList(datas.list)
        }
    },[datas])
    useEffect(()=>{
        setList([])
        if(params.collection)
            setRenameValue(utils.firstUppercase(params.collection));
    },[params])
    

    function etcHandle (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        const t = e.currentTarget.parentElement;
        const sibling = Array.from(document.querySelectorAll('.etc'))
        if(t) {
            sibling.map(v=>v.classList.remove('on'));
            t.classList.add('on')
        }
    }
    function btnHandle (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        const t = e.currentTarget
        const li = t.parentElement?.parentElement?.parentElement
        let body;
        switch(t.className) {
            case 'edit' :
                if (li && Array.from(li.children))
                    router.push(`/admin/${params.db}/${params.collection}/edit?index=${Array.from(li.children).filter(x=>x.className.includes('index'))[0].textContent}`)
                break;
            case 'delete' :
                if (window.confirm('삭제하시겠습니까?')) {
                    let mongoid;
                    if (li) mongoid = li.dataset.mongoid;
                    body = {
                        collectionName:params.collection,
                        dbName:params.db,
                        mongoid,
                    }
                    adminDataDeleteApi(body)
                        .then(res=>{
                            if (res.data.ok) {
                                alert(res.data.msg);
                                router.refresh();
                            }
                        })
                } 
                break;
            case 'close' :
                t.parentElement?.parentElement?.classList.remove('on')
                break;
        }
    }

    function reName (e:React.MouseEvent) {
        e.preventDefault();
        if (rename) {
            setRename(false)
            if (!!!renameValue) throw alert('빈칸은 입력할 수 없습니다.');
            if (params.db && params.collection) {
                let body:collectionReName =  {
                    dbName:params.db,
                    collectionName:params.collection,
                    newCollectionName:renameValue,
                }
                adminCollectionRename(body).then(res=>{
                    console.log(res);
                    if(res.ok) {
                        router.push(`/admin/${params.db}/${renameValue}`)
                    }
                });

            }

        }
        else setRename(true);
    }
    function reNameValue (e:React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        const input = e.currentTarget;
        if (input) {
            if (!utils.only(input.value)) {
                setErrorMsg(false);
                e.currentTarget.value = input.value.slice(0,-1) 
            } else {
                setRenameValue(e.currentTarget.value.toLocaleLowerCase());
                setErrorMsg(true);
            }
        }
    }

    return(
        <>
            <ul className={`dataTable m-auto w-[90%] mt-4 overflow-hidden pb-[100px]`}>
                <li className={`flex items-end text-4xl font-black mb-4 relative`}>
                    {
                        rename ?
                        <input type="text" ref={renameInput} className="max-w-[200px] pl-2 rounded-md" value={renameValue} onChange={reNameValue}/>:
                        <h2 className={``}>
                            { params.collection ? utils.firstUppercase(params.collection) : null}
                        </h2>
                    }
                    <button className="text-base ml-2 text-green-300 " onClick={reName}>
                        <MyIcons className="" icon={'wrench'}/>
                    </button>
                    {
                        errorMsg ? null :<ErrorMsg text="영어만 입력해주세요" />
                    }
                    <div className="absolute right-0">
                    {
                        params.collection !== 'users' ?
                        <Link href={`/admin/${params.db}/${params.collection}/insert`} className="p-2 pr-3 pl-3 rounded-md text-xl">
                            <MyIcons icon={'pen'}/>
                        </Link> : null
                    }
                    </div>
                </li>
                <li className={_li+' bg-gray-500 text-white tagName'}>
                    {
                        key.map((v:any,i:number)=>{
                            return (
                                <div key={`keys_${v}`} className={`${convert(v).className}`}>
                                    { convert(v,label[i]).tag }
                                </div>
                            )
                        })
                    }
                    <div className={etc}>
                        etc
                    </div>
                </li>
                {
                    list.length <= 0 ? 
                    <li className="border-b border-gray-500">
                        <Loading loading={list.length <=0}>
                            <h2 className={`text-center p-3 text-2xl`}>
                                없음
                            </h2>
                        </Loading>
                    </li> :
                    list.map((v:Record<string,string>,i:number)=>{
                        delete v.userPw;
                        if(!!v.create_date)
                            v.create_date = utils.getDate(v.create_date,'mm-dd');
                        const val = Object.values(v)
                           return  (
                                <li className={`${_li} border-b border-gray-500`} data-mongoid={v._id}  key={`${v}_${i}`}>
                                    {
                                        Object.keys(v).map((v2:any,i2:number)=>{
                                            // 로그인 일 경우
                                            let text:any = val[i2];
                                            if (v2 === 'l_token' && val[i2]) text = convert(v2).text;
                                            if (v2 ==='_id' || v2 ==='role' && val[i2]) text =convert(v2,text).text;
                                            return (
                                                <div
                                                    key={`${v2}_${i2}_`} 
                                                    className={`${v2} ${convert(v2).className+' flex items-center justify-center'}`}
                                                    >
                                                    { text }
                                                </div>
                                            )
                                        })
                                    }
                                    <div className={etc+" text-2xl relative "+flex_center}>
                                        <button onClick={etcHandle}>
                                            ☰
                                        </button>
                                        <div className={`buttonDom`}>
                                            <button className="edit" onClick={btnHandle}>
                                                ✍🏻
                                            </button>
                                            <button className="delete" onClick={btnHandle}>
                                                🗑️
                                            </button>
                                            <button className="close" onClick={btnHandle}>
                                                →
                                            </button>
                                            
                                        </div>
                                    </div>
                                </li>
                            )
                    })
                }
            </ul>
     
        </>
    )
}


function convert (target:string,text?:string|undefined) {
    target = target.toLowerCase();
    const inc = (t:string) => target.includes(t.toLowerCase());
    type convert ={
        tag:string,
        className:string,
        text:any,
    }
    const init:convert = {
        tag:target,
        className:_default,
        text:""
    }
    switch(true) {
        case inc('userid') :
            return {
                ...init,
                tag:'id',
                className:midle
            };
        case inc('_id') :
            return {
                ...init,
                tag:'key',
                className:small,
                text:
                <div className={'tooltip'}>
                    확인
                    <div className="tooltip-content">
                        {text}
                    </div>
                </div>
            }
        case inc('username') :
            return{
                ...init,
                tag:'이름',
                className:small,
            }
    
        case inc('phonenumber'):
            return {
                ...init,
                tag:'연락처',
                className:long
            };
        case inc('l_token'):
            return {
                ...init,
                tag:'로그인',
                text: <div className="rounded-full bg-green-400 w-4 h-4 m-auto"></div> ,
                className:"w-full max-w-[5%]"
            }
        case inc('singupdate') :
            return{
                ...init,
                tag:'가입날짜',
                className:long,
            }
      
        case inc('index') :
            return {
                ...init,
                tag: 'no.',
                className:small+" order-first"
            }
        case inc ('create_date') :
            return {
                ...init,
                tag:'생성 날짜',
                className: midle+" order-5",
            }
        case inc('role') :
            return {
                ...init,
                tag:'등급',
                text: text === '0' ? '관리자' : '일반회원'
            }
        default: 
            return {
                ...init,
                className:_default,
                tag:text
            };
    }
}