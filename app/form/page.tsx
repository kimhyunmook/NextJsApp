"use client";
import { useState } from "react";
import Btn from "../component/button";
import { title } from "../util/style";
import { useRouter } from "next/navigation";

type inputDefault= {
    type?:string;
    id:string;
    placeholder?:string;
    value?:any;
    className?:string;
    listClassName?:string;
    onChange?:any;
    required?:boolean;
}
const inputStyle = 'rounded-lg p-2 pl-4 text-xl'
function Input (props:inputDefault):React.ReactElement {
    const listClassName = !!props.listClassName ? props.listClassName :'';
    const inputClassName = !!props.className ? props.className:"";
    const type =!!props.type ? props.type : "text";
    const required = !!props.required ? true :false

    return(
        <li className={`w-full mt-2 mb-2 ${listClassName}`}>
            <input 
            id={props.id}
            name={props.id} 
            className={`w-full ${inputStyle} ${inputClassName}`} 
            type={type}
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder}
            required={required} />
        </li>
    )
}
type FormSubmitFunction = (data: any) => Promise<any>;
type Props = {
    title:string|any;
    data:any | {
        keys:any[];
        types:any[];
    };
    submit: FormSubmitFunction;
}
export default function FormDefault(props:Props) {
    const data = props.data
    const router =useRouter();

    const submitHandle = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
        e.preventDefault();
        const form = document.forms[0];
        let body:any = {
            collectionName:data.collectionName,
            dbName:data.dbName,
            insertData:[]
        }

        const kit = Array.from(document.querySelectorAll('form .datakit'));

        kit.map((v:Element,i:number)=>{
            const data:Record<string,string>= {}
            Array.from(v.children).map((v2,i2)=>{
                const input = v2.children[0] as HTMLInputElement
                data[input.id] =input.value;
            })
            body.insertData.push(data)
        })
        console.log(body);
    
        
        props.submit(body).then(res=>{
            if (res.ok) {
                alert(res.msg);
                router.back();
            } 
            else alert('입력이 불가능합니다.')
        })
        
    }

   
    const [html,setHtml]= useState<any>([])
    const kitStyle = `p-2 rounded-md bg-green-400 mt-2 mb-2`;
    

    function add (e:React.MouseEvent<HTMLButtonElement,MouseEvent>) {
        e.preventDefault();
        const kit = (
            <ul key={`kit_${html.length}`} className={`datakit ${kitStyle}`}>
                {
                    data.keys.map((v:any,i:number)=>{
                        return(
                            <Input key={`${v}_${i}`} id={v} placeholder={data.labels[i]}  />
                        )
                    })
                }
            </ul>
        )
        setHtml((p:any)=>[...p, kit])
    }
    function remove(index:number) {
        setHtml((p:any)=> p.filter((_:any, i:number) => i !== index));
    }

    const btnStyle = `max-w-[50px] mr-2`;

    return(
        <form className={`mr-auto ml-auto mt-16 mb-20 w-full max-w-[400px]`} >
            <h2 className={title}>{props.title}</h2>
            <div className="button flex">
                    <Btn className={btnStyle} onClick={add}>
                        +
                    </Btn>
                    <Btn className={btnStyle} 
                        onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
                        e.preventDefault();
                            remove(html.length - 1)
                        }}>
                        -
                    </Btn>
            </div>
            <ul className={`datakit ${kitStyle}`}>
                {
                    data.keys.map((v:any,i:number)=>{
                        return(
                            <Input key={`${v}_${i}`} id={v} placeholder={data.labels[i]}  />
                        )
                    })
                }
            </ul>
            { html }
            <Btn onClick={submitHandle} className="block ml-auto">입력</Btn>
        </form>
    )
}