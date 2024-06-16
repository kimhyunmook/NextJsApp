"use client"

import { title } from "@/app/util/style";
import Btn from "@/app/component/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import TYPE from "@/lib/type";
import { useParams, useRouter } from "next/navigation";
import util from "@/app/util/utils";
import text from "@/app/language/ko-kr/collection";
import ErrorMsg from "@/app/component/errorMsg";

type Props = {
    btnStyle?:string;
    title?:string;
    data?:{};
    submit? :any;
    delete?: boolean;
}
export default function CreateLayout(props:Props) {
    const[html,setHtml] = useState<any>([]);
    const dispatch = useDispatch();
    const router = useRouter();
    let delMode = !! props.delete ? {
        status:props.delete,
        fnc:deleteSchema
    } : null;
    function deleteSchema (e:React.MouseEvent) {
        e.preventDefault();
        const target = e.currentTarget.parentNode?.parentNode;
        if (target instanceof HTMLElement)
            target.remove();
    }
    useEffect(()=>{
        if (!!props.data) {
            const [key, value] = [Object.keys(props.data),Object.values(props.data)]
            const t = key.reduce((a:React.ReactElement[], c, i)=>{
                a.push(<NewInput k={c} v={value[i]} key={`${c}_${i}`} delMode={delMode} />)
                return a;
            },[])
            setHtml(t)
        }
    },[props.data]);

    function add(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        setHtml((prev:any) => [...prev,<NewInput  key={`inputs_${html?.length}`} delMode={delMode} />])
    }
    function remove(index:number) {
        setHtml((prev:any)=> prev.filter((_:any, i:number) => i !== index));
    }
    async function submit(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        const arr = (target:string) => Array.from(document.querySelectorAll(target));
        // const keys = arr('.schema .key');
        const labelNames = arr('.schema .labelName');
        type Values= {
            collectionName:string;
            dbName:string;
        }
        const values:Values = arr('.bodyInfo input').reduce((a,c,i)=>{
            if (c instanceof HTMLInputElement)
                a = {
                    ...a,
                    [c.id]:c.value
                }
            return a;
        },{
            dbName:'',
            collectionName:''
        });
        const schema= labelNames.reduce((a:any,c,i:number)=>{
            // const labelName = labelNames[i] as HTMLInputElement;
            if(c instanceof HTMLInputElement) {
                if (!!!c.value) {
                    alert('key를 입력해주세요');
                    c.focus();
                    return
                }
                a.push({keyLabel:c.value})
            }
            // if (!!!labelName.value) {
            //     alert('Label Name을 정해주세요');
            //     labelName.focus();
            //     return;
            // }
            return a;
        },[]);
        
        // select로 변경하면서 생긴 사항
        const dbNameSelect = document.querySelector('.bodyInfo select');
        let body = {
            ...values,
            schema,
        }
        if (dbNameSelect instanceof HTMLSelectElement) body.dbName = dbNameSelect.value;
        await axios.post('/api/db/collection/create',body)
            .then(res=>{
                if (res.data.ok) {
                    alert('Collection이 생성 되었습니다.')
                    let body2 = {
                        bodyType:"collection",
                        dbName:body.dbName
                    }
                    dispatch({type:TYPE('admin_nav_collection').REQUEST,...body2})
                    setTimeout(()=>{
                        router.push(`/admin/${body.dbName}/${body.collectionName}`)
                    },500)
                } else {
                    alert(res.data.msg);
                }
            })
    }


    return (
        <div className="createLayout">
                <h2 className={title}>
                {
                    !!props.title ? 
                    props.title 
                    :'Schema'
                }
                </h2>
            <ul>
                <li className={`flex mb-2`}>
                    <Btn className={props.btnStyle} onClick={add}>
                        +
                    </Btn>
                    <Btn className={props.btnStyle} onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
                        e.preventDefault();
                        remove(html.length - 1)
                        }}>
                        -
                    </Btn>
                </li>
                { html } 
                {
                    html.length > 0 ?
                    <li>
                        <Btn onClick={!!props.submit ? props.submit : submit}>
                            { text.create_submit }
                        </Btn>
                    </li> : null
                }
            </ul>
        </div>
    )
}

function NewInput ({ k, v, delMode }:{k?:any, v?:any, delMode?:{status:boolean,fnc:any}|null}) {
    const [errorMsg,setErrorMsg] = useState(true);
    const utils = util();
    const labelStyle =`hidden`;
    const inputStyle = `w-full h-full pl-2`;
    const boxStyle =`flex w-full min-h-[40px] border border-bule-500 relative ${errorMsg ? '' : 'mb-4'}`;

    return (
        <li className={`schema flex pt-2 pb-2 mb-2 justify-between`}>
            {/* <div className={`${boxStyle} `}>
                <label className={labelStyle} htmlFor="key">
                    {text.create_2_1}
                </label>
                <input className={`key ${inputStyle}`} type="text" defaultValue={!!k ? k : ''} name="key" id="key" placeholder={`${text.create_2_1}`} onChange={onlyEnglish}/>
                {
                    errorMsg ? null : 
                    <ErrorMsg text='영어와 숫자만 입력해주세요'/>
                }
            </div> */}
            <div className={`${boxStyle}`}>
                <label className={labelStyle} htmlFor="labelName">
                    { text.create_2_2 }
                </label>
                <input className={`labelName ${inputStyle}`} type="text" defaultValue={!!v ? v : ''} name="labelName" id="labelName" placeholder={`${text.create_2_2}`} />
                {
                    delMode?.status ?  
                    <button className="text-lg w-[7%] bg-blue-400 hover:bg-red-400" onClick={delMode.fnc}> - </button>
                    :null
                }
            </div>
        </li>
    )
}