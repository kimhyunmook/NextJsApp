"use client";
import Btn from "../component/button";
import { title } from "../util/style";
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

const inputStyle:string = 'border border-[rgba(0,0,0,0.5)] rounded-lg p-2 text-xl'
function Input (props:inputDefault):React.ReactElement {
    const listClassName = !!props.listClassName ? props.listClassName :'';
    const inputClassName = !!props.className ? props.className:"";
    const type =!!props.type ? props.type : "text";
    const required = !!props.required ? true :false

    return(
        <li className={`w-full mt-2 mb-2 ${listClassName}`}>
            <input 
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

export default function formDefault() {
    const submitHandle = async (e:Event) =>{
        e.preventDefault();
        const form = document.forms[0];
        let body = {
            subject:form.subject.value,
            content:form.content.value,
            categori:form.categori.value,
        }
        console.log(body)
        try {
        }
        catch (error) {
            console.error(error)
        }
    }
    return(
        <form className={`mr-auto ml-auto mt-16 mb-20 w-full max-w-[400px]`} >
            <h2 className={title}># 글쓰기</h2>
            <ul className="">
                <Input id="categori" placeholder="#카테고리 (#으로 구분 ex #맛집#인스타)" />
                <Input id="subject" placeholder="* 제목" required={true}/>
                <textarea 
                    className={`w-full resize-none ${inputStyle} h-[250px]`} 
                    name="content" 
                    id="content" 
                    cols={30} 
                    rows={10} 
                    placeholder="* 내용"
                ></textarea>
            </ul>
            <Btn onClick={submitHandle} className="block ml-auto">입력</Btn>
        </form>
    )
}