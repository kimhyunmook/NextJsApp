"use client"
import style, { flex_center } from "../util/style";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch,faX } from '@fortawesome/free-solid-svg-icons';
import { CSSProperties } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export type SearchForm = {
    style?:CSSProperties
    border?:string;
    onClick?:()=>void
}
export default function SearchForm (props:SearchForm) {
    const router = useRouter()
    const border = !!props.border ? props.border:`border-gray-500`;
    async function onClickHandle (e:React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        let input:any;
        if (!!e.currentTarget.parentNode) {
            input = Array.from(e.currentTarget.parentNode.children).filter(x=>x.tagName==='INPUT');
            if (input.length >0) {
                input = input[0]
            }  
        }
        let body = {
            keyword:input.value,
        }
        const res = await axios.post('/api/search',body)
            .then(res=>{
                console.log(res.data);
                const response = res.data.ok;
                const data = res.data.msg;
                // const
                if (response) {
                    if (data.length ===1) {
                        router.push(data[0].href);
                    }
                    else if (data.length > 1) {
                        alert('두개 이상이지요')
                    }
                    else {
                        alert('검색하신 내용이 없습니다.');
                    }
                } else {

                }
            })
        props.onClick;
    }
    function resetHandle (e:React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        let input:any;
        if (!!e.currentTarget.parentNode) {
            input = Array.from(e.currentTarget.parentNode.children).filter(x=>x.tagName==='INPUT');
            if (input.length >0) {
                input = input[0]
                input.value = '';
            }  
        } 
    }
  
    return (
        <div className={`search m-auto border ${border} min-w-[400px] max-w-[700px] w-[100%] h-10 ${flex_center} rounded-2xl overflow-hidden`}
            style={{...props.style}}
        >
            <input type="text" className="h-full block w-[92%] pl-3 bg-zinc-900" />
            <button className="close pr-3 pl-3" onClick={resetHandle}>
                <FontAwesomeIcon icon={faX} />
            </button>
            <button className={`w-[8%] min-w-[55px] h-full bg-zinc-700 ${border} p-2 pr-3 pl-3`} onClick={onClickHandle}>
                <FontAwesomeIcon icon={faSearch} />
            </button>
        </div>
    )
}