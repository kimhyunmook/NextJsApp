"use client";
import { useState } from "react";
import Btn from "../component/button";
import { title } from "../util/style";
import { useRouter } from "next/navigation";
import { useParams } from "react-router-dom";

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

    const [textarea,setTextarea] = useState(false);
    function boxChange (e:React.ChangeEvent<HTMLInputElement>) {
        if (e.currentTarget.checked) {
            setTextarea(true);
        } else {
            setTextarea(false);
        }
    }
    const [inputValue,setInputValue] = useState(props.value);
    function changeHandle (e:React.ChangeEvent<HTMLInputElement>) {
        setInputValue(e.currentTarget.value)

    }
    return(
        <li className={`w-full mt-2 mb-2 ${listClassName}`}> 
            <div className="w-full flex items-center justify-end">
                <label htmlFor="textarea" className="text-sm text-zinc-900 mr-1 mb-1">
                    textarea
                </label>
                <input type="checkbox" className="chk border-none" name="textarea" onChange={boxChange} id="textarea" />
            </div>
             {
                !textarea ?
                <input 
                id={props.id}
                name={props.id} 
                className={`w-full ${inputStyle} ${inputClassName}`} 
                type={type}
                defaultValue={inputValue}
                onChange={changeHandle}
                placeholder={props.placeholder}
                required={required} />
                :
                <textarea className="p-2 h-[150px] text-xl rounded-md w-full" id={props.id} placeholder={props.placeholder}>
                    { inputValue }
                </textarea>
             }
        </li>
    )

}
type FormSubmitFunction = (data: any) => Promise<any>;
export type formDefault = {
    title:string|any;
    data:any | {
        keys:any[];
        types:any[];
    };
    // bodyData: any,
    addBtn?:boolean;
    valueData?:  any;
    submit: FormSubmitFunction;
}
export default function FormDefault(props:formDefault) {
    const data = props.data
    const router =useRouter();

    const submitHandle = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
        e.preventDefault();
        let body:any = {
            collectionName:data.collectionName,
            dbName:data.dbName,
            data:[]
        }
        console.log(props.valueData)

        const kit = Array.from(document.querySelectorAll('form .datakit'));
        kit.map((v:Element,i:number)=>{
            const data:Record<string,string>= {}
            Array.from(v.children).map((v2,i2)=>{
                const input = v2.children[1] as HTMLInputElement
                data[input.id] =input.value;
            })
            body.data.push(data)
        })
        if (props.title.toLowerCase().includes('edit') && props.valueData)
            body = {
                ...body,
                key_index:props.valueData.key_index
            }
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
            {
                !!props.addBtn ?
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
                </div> : null
            }
            <ul className={`datakit ${kitStyle}`}>
                
                {
                    data.keys.map((v:any,i:number)=>{
                        const val = !!props.valueData? props.valueData[v] :null
                        return(
                            <Input 
                                key={`${v}_${i}`} 
                                id={v} 
                                placeholder={data.labels[i]} 
                                value={val} 
                                />
                        )
                    
                    })
                }
            </ul>
            { html }
            <Btn onClick={submitHandle} className="block ml-auto">입력</Btn>
        </form>
    )
}