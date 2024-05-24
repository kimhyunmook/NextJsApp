import style, { flex_center } from "../util/style";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { CSSProperties } from "react";
import axios from "axios";

export type searchForm = {
    style?:CSSProperties
    border?:string;
    onClick?:()=>void
}
export default function SearchForm (props:searchForm) {
    const border = !!props.border ? props.border:`border-gray-400`;
    async function onClickHandle (e:React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        let body = {

        }
        const res = await axios.post('/api/search',body)
        props.onClick;
    }
  
    return (
        <div className={`search m-auto border ${border} min-w-[400px] max-w-[700px] w-[100%] h-10 ${flex_center} rounded-2xl overflow-hidden`}
            style={{...props.style}}
        >
            <input type="text" className="h-full block w-[92%] pl-3" />
            <button className={`w-[8%] min-w-[50px] h-full bg-zinc-700 border-l ${border} p-2 pr-3 pl-3`} onClick={onClickHandle}>
                <FontAwesomeIcon icon={faSearch} />
            </button>
        </div>
    )
}