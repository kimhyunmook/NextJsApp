"use client"
import Layout from "@/app/component/layoutControl"
import Loading from "@/app/loadingg"
import { flex_center, title } from "@/app/util/style"
import TYPE from "@/lib/type"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Btn from "@/app/component/button"
import { adminListDeleteApi } from "@/lib/api/adminNavAPi"

type Props = {
    params:{
        collection: string | null | undefined;
    }
    data:any
}
export default function AdminDataTable (props:Props) {
    const target = props.params.collection
    const [list,setList] = useState<any>([])
    const dispatch =useDispatch();
    const datas = useSelector<any>((state)=>state.admin.datas)
    const storeLoading = useSelector<any>((state)=>state.admin.loading) && list.length > 0
    const [key,setKey] =  useState<any>([]);
    // console.log(store);

    useEffect(()=>{
        let body = {
            bodyType:'collection_target',
            target,
        }   
        if (!!!list.length)
            dispatch({type:TYPE(`admin_collection_target`).REQUEST,...body})      
        if (datas) {
            setList(datas);
        }
    },[datas])

    useEffect(()=>{
        if(list.length > 0) {
            const keys =list[0]
            setKey(Object.keys(keys));
        }
    },[list])

    const {_li,long,midle,small,_default,etc} = {
        _li:"flex text-center p-2 pr-0 pl-0 break-words justify-between",
        long:"w-full max-w-[18%]",
        midle:"w-full max-w-[12%]",
        small:"w-full max-w-[7%]",
        _default:"w-full max-w-[9%]",
        etc: "etc w-full max-w-[5%]"
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
                    tag:'m_Id',
                    className:small,
                    text:
                    <div className={'tooltip'}>
                        확인
                        <div className="tooltip-content">
                            {text}
                        </div>
                    </div>
                }
            case inc('username'):
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
            default: 
                return {
                    ...init,
                    className:_default
                };
        }
    }
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
        let body;
        switch(t.className) {
            case 'edit' :

                break;
            case 'delete' :
                const index = Array.from(t.parentElement?.parentElement?.parentNode?.children || []).filter((x,i)=>{
                    const values = x.getAttribute('data-values')?.toLowerCase();
                    if (values?.includes('index'))
                        return x
                })[0]
                const mongoid = t.parentElement?.parentElement?.parentElement?.dataset.mongoid;
                console.log()
                body = {
                    collectionName:target,
                    mongoid,
                }
                adminListDeleteApi(body).then(res=>{
                    console.log(res.data);
                })
                break;
            case 'close' :
                t.parentElement?.parentElement?.classList.remove('on')
                break;
        }
    }
    return(
        <Layout all={true}>
            <Loading loading={storeLoading}>
                <ul className={`dataTable m-auto w-[90%] mt-4 overflow-hidden`}>
                    <li>
                        <h2 className={`${title}`}>
                            { target ? target.charAt(0).toUpperCase()+target.slice(1): null}
                        </h2>
                    </li>
                    <li className={_li+' bg-gray-500 text-white tagName'}>
                        {
                            key.map((v:any,i:number)=>{
                                return(
                                    <div key={`keys_${v}`} className={`${convert(v).className}`}>
                                        {convert(v).tag}
                                    </div>
                                )
                            })
                        }
                        <div className={etc}>
                            etc
                        </div>
                    </li>
                    {
                        list.length <= 1 ? 
                        <li className="border-b border-gray-500">
                            <h2 className={`text-center p-3 text-2xl`}>
                                없음
                            </h2>
                        </li> :
                        list.map((v:Record<string,string>,i:number)=>{
                            delete v.userPw;
                            const val = Object.values(v)
                            const firstEl = document.querySelector('.dataTable .tagName')?.children;
                            if( firstEl && firstEl?.length > 1 )
                                // type data remove
                                if (i !== list.length-1)
                                return  (
                                    <li className={`${_li} border-b border-gray-500`} data-mongoid={v._id}  key={`${v}_${i}`}>
                                        {
                                            Object.keys(v).map((v2:any,i2:number)=>{
                                                // 로그인 일 경우
                                                let text:any = val[i2];
                                                if(v2 === 'l_token' && val[i2]) text = convert(v2).text;
                                                if(v2 ==='_id' && val[i2]) text =convert(v2,text).text;

                                                return (
                                                    <div 
                                                        key={`${v2}_${i2}`} className={`${convert(v2).className+' flex items-center justify-center'}`}>
                                                        {text}
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
                <div className="fixed bottom-4 right-8">
                    <Btn>
                        입력
                    </Btn>
                </div>
            </Loading>
        </Layout>
    )
}

