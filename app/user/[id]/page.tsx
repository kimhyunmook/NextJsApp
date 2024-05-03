"use client"
import Modal from "@/app/component/modal";
import { able_button, disable_button, flex_center, mobile_box, onepage, title } from "@/app/util/style";
import TYPE from "@/lib/type";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Logo from "@/app/component/logo";
import { useParams, useRouter } from "next/navigation";

export default function userInfo ({params}:any) {
    const user = useSelector((state:any)=>state.user);
    const login = useSelector((state:any)=>state.user.login);
    const router = useRouter()
    useEffect(()=>{
        if (!login) router.push('/login')
    },[login])
    let userValueArr:any[],userKeyArr :any[];
    if (user) {
        userValueArr = Object.values(user.user)
        userKeyArr = Object.keys(user.user)
        return(
            <form className={`${mobile_box} pt-8 pb-40 h-screen`}>
                <Logo className={`text-center text-5xl mb-10`}></Logo>
                <h2 className={`${title}`}>
                    {user.user.userId} 님의 정보
                </h2>
                <ul className="flex flex-wrap">
                    {
                        userValueArr.map((v,i)=>{
                            if(i !=0 ) {
                                const keyName = userKeyArr[i]
                                const att:InputProps = {
                                    label:"",
                                    fix:true,
                                    value:v,
                                    order:0,
                                    id:keyName,
                                    userId:params.id,
                                    placeholder:''
                                }
                                switch(keyName) {
                                    case 'userName' : 
                                        att.label ="이름"
                                        att.fix=false;
                                        break;
                                    case 'userPhoneNumber': 
                                        att.label="연락처"
                                        break; 
                                    case 'singUpDate' : 
                                        att.label='가입날짜';
                                        att.fix=false;
                                        break;
                                    case 'userPw':
                                        att.label = '비밀번호';
                                        att.value = "";
                                        att.placeholder = 'new Password'
                                }
                                if(keyName !== 'key_index')
                                return <InputLi 
                                    key={keyName} 
                                    {...att}
                                   
                                    />
                            }
                        })
                    }
                </ul>
            </form>
        )
    }
}

interface InputProps {
    id:string;
    label:string;
    value:any[]|string;
    children?:React.ReactElement
    listbox?:boolean
    userId:string;
    fix?:boolean;
    order?:number;
    placeholder?:string;
}
function InputLi(props:InputProps) {
    const [fix,setFix] = useState(false);
    const [add,setAdd] = useState(<></>)
    const dispatch = useDispatch();
    const [value,setValue] =useState(props.value);
    const router = useRouter();
    const params = useParams();

    async function fixInput (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        if(!fix){
            setFix(true)
        }
        else {
            setFix(false)
            if (window.confirm('변경하시겠습니까?')) {
                const inputEl = e.currentTarget.previousSibling
                if (inputEl instanceof HTMLInputElement) {
                    if (!!!inputEl.value) {
                        alert('빈칸을 채워주세요');
                        return
                    }
                    let body = {
                        userId:props.userId,
                        key:inputEl.id,
                        value:inputEl.value
                    }   
                    dispatch({type:TYPE('user_fix').REQUEST,...body})
                    alert('변경되었습니다.')
                    router.push(`/user/${params.id}`)
                }
            } else {
                setTimeout(()=>{
                    router.push(`/user/${params.id}`)
                },100)
            }
        }
    }
    const inputStyle = `w-[65%] p-1 pl-3  ease-in duration-100 rounded-md ${fix ? `border-2 border-blue-500 text-blue-500 bg-gray-200` : ``} `;
    const maxH = "max-h-[40px]";   
    const order = !!props.order ? `order-${props.order}`: null;
    
    return (
        <li className={`w-full flex ${order} relative justify-between mb-2 mt-2 text-xl pt-2 pb-2`}>
            <div className={`input-cover absolute left-0 h-full z-10 ease-in duration-500  ${fix ? "w-0": "bg-[rgba(132, 0, 0, 0.3)] w-[90%]" }`}></div>
            <label className={`pl-2 font-bold w-[20%] break-keep text-base`} htmlFor={props.id}>
                <b className={`flex items-center block h-full ${maxH}`}>
                    {props.label}
                </b>
            </label>
            {
                !!props.children ? props.children :
                    props.listbox && Array.isArray(props.value) ?
                        <ul className={`${inputStyle} flex flex-wrap justify-start`}>
                            {
                                props.value.map((v,i)=>{
                                    return <li 
                                        key={`${v.name}_${i}`} 
                                        className={`${!!v.color ? v.color : "bg-blue-500"} m-1 min-w-[40px] pt-1 pb-1 pr-3 pl-3 rounded-md text-white ${maxH} ${flex_center}`}
                                    >{v.name}</li>
                                })
                            }
                        </ul> :
                        <input 
                            className={`${inputStyle}`} 
                            id={props.id}
                            name={props.id}
                            type="text" 
                            defaultValue={value}
                            placeholder={props.placeholder}
                            />
            }
            {
                props.fix ? 
                <button 
                    className={`${fix ? able_button : disable_button} p-1 w-[10%] rounded-md max-h-[36px] min-w-[40px] text-base font-bold`} 
                    onClick={fixInput}>
                    Fix
                </button>:
                <div className="w-[10%]"></div>
            }
            { add }
        </li>
    )
}