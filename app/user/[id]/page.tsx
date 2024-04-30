"use client"
import Modal from "@/app/component/modal";
import { able_button, disable_button, flex_center, mobile_box, onepage, title } from "@/app/util/style";
import TYPE from "@/lib/type";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Logo from "@/app/component/logo";

export default function userInfo ({params}:any) {
    const user = useSelector((state:any)=>state.user);
  
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
                <ul>
                    {
                        userValueArr.map((v,i)=>{
                            if(i !=0 ) {
                                const keyName = userKeyArr[i]
                                let label:string ="";
                                let fix:boolean = true;
                                switch(keyName) {
                                    case 'userName' : 
                                        label ="이름"
                                        fix=false;
                                        break;
                                    case 'userPhoneNumber': 
                                        label="연락처"
                                        break; 
                                    case 'singUpDate' : 
                                        label='가입날짜';
                                        fix=false;
                                        break;
                                        
                                }
                                if(keyName !=='userPw' && keyName !== 'userIndex')
                                return <InputLi key={keyName} id={keyName} value={v} label={label} userId={params.id} fix={fix} />
                            }
                        })
                    }
                    {/* <InputLi id={"techStack"} value={[{name:'git',color:'bg-black'}, {name:'html',color:''},{name:'javasciprt',color:'bg-yellow-500'}]} label={"기술 스택"} listbox={true} userId={params.id} /> */}
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
}
function InputLi(props:InputProps) {
    // const user = useSelector((state:any)=>state.user);
    const [fix,setFix] = useState(false);
    const [modal,setModal] = useState(<></>)
    const dispatch = useDispatch();
    const user = useSelector((state:any)=>state.user);


    function techStack(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        window.location.reload();
    }
    async function fixInput (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        if(!fix){
            setFix(true)

            // modal 인경우
            if (props.id ==='techStack') {
                setModal(
                <Modal display={true} closeBtn={<button className="modalBtn" onClick={techStack}>저장</button>}>
                    <div></div>
                </Modal>)
            }
        }
        else {
            setFix(false)
            const inputEl = e.currentTarget.previousSibling
            if(inputEl instanceof HTMLInputElement) {
                let body = {
                    userId:props.userId,
                    key:inputEl.id,
                    value:inputEl.value
                }   
                dispatch({type:TYPE('user_fix').REQUEST,...body})
            }
        }
    }
    const inputStyle = `w-[65%] p-1  ease-in duration-100 rounded-md ${fix ? `border-2 border-blue-500 text-blue-500` : ``} `;
    const maxH = "max-h-[40px]";
    
    return (
        <li className={`flex relative justify-between mb-4 mt-4 text-xl border-b pt-2 pb-2`}>
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
                            defaultValue={props.value}/>
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
            {modal}
        </li>
    )
}