"use client"

import { title } from "@/app/util/style";
import Btn from "@/app/component/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import TYPE from "@/lib/type";
import { useRouter } from "next/navigation";
type Props = {
    btnStyle:string;
}
export default function CreateLayout(props:Props) {
    const[html,setHtml] = useState<any>([]);
    const dispatch = useDispatch();
    const router = useRouter();


    function add(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        const boxStyle =`w-[49%] min-h-[40px] border border-bule-500`
        const labelStyle =`hidden`
        const inputStyle = `w-full h-full pl-2`
        const newInput = (
            <li key={`inputs_${html.length}`} className={`schema flex pt-2 pb-2 mb-2 justify-between`}>
                <div className={`${boxStyle}`}>
                    <label className={labelStyle} htmlFor="key">
                        key
                    </label>
                    <input className={`${inputStyle} key`} type="text" name="key" id="key" placeholder="Key"/>
                </div>
                <div className={`${boxStyle}`}>
                    <label className={labelStyle} htmlFor="type">
                        type
                    </label>
                    <input className={`${inputStyle} type`} type="text" name="type" id="type" placeholder="type"/>
                </div>
            </li>
        )
        setHtml((prev:any) => [...prev,newInput])
    }
    function remove(index:number) {
        setHtml((prev:any)=> prev.filter((_:any, i:number) => i !== index));
    }
    async function submit(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        const collectionName = document.querySelector('#collectionName') as HTMLInputElement;
        const arr = (target:string) => Array.from(document.querySelectorAll(target));
        const keys = arr('.schema .key');
        const types = arr('.schema .type');
     
        const schema= keys.reduce((a:any,c:any,i:number)=>{
            const type = types[i] as HTMLInputElement;
            if (!!!c.value) {
                alert('key를 입력해주세요');
                c.focus();
                return
            }
            if (!!!type.value) {
                alert('type을 정의해주세요');
                type.focus();
                return;
            }
            a.push({keyName:c.value, keyType:type.value})
            return a;
        },[]);

        let body = {
            collectionName:collectionName.value,
            schema,
        }
        await axios.post('/api/db/create',body)
            .then(res=>{
                if(res.data.ok) {
                    alert('Collection이 생성 되었습니다.')
                    let body = {
                        bodyType:"collection"
                    }
                    dispatch({type:TYPE('admin_nav').REQUEST,...body})
                    router.refresh()
                } else {
                    alert(res.data.msg);
                }
            })
    }
    return (
        <div className="createLayout">
            <h2 className={title}>
            Schema
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
                {html}
                {
                    html.length > 0 ?
                    <li>
                        <Btn onClick={submit}>
                            submit
                        </Btn>
                    </li> : null
                }
            </ul>
        </div>
    )
}