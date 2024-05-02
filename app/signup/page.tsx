"use client"

import { flex_center, mobile_box, onepage, title } from "../util/style"
import { Li } from "../login/page"
import Btn from "../component/button"
import { useCallback, useEffect, useState } from "react"
import axios from "axios"
import { getDate } from "../util/cookie"
import util from "../util/utils"
import { set } from "mongoose"

export type userSchema = {
    userId:string;
    userPw:string;
    userName:string;
    userPhoneNumber:string;
    singUpDate:string;
}

function register () {
    const [userId,setUserId] =useState("")
    const [userPw,setUserPw] =useState("")
    const [userPw2,setUserPw2] =useState("")
    const [userName,setUserName] =useState("")
    const [userPhoneNumber,setUserPhoneNumber] =useState<any>("")
    const [idChk,setIdChk] = useState({
        ok:false,
        fixed:""
    });
    const [allChk,setAllChk]= useState(false);
    const [pwConfirm,setPwConfirm] =useState<any>(null)
    const utils = util();

    useEffect(()=>{
        if(!!userPw && !!userPw2) {
            const commonClass = `w-20 text-white ${flex_center}`
            if(userPw === userPw2) {
                setPwConfirm(<div className={`${commonClass} bg-blue-400 `}>Pass</div>)
            } else {
                setPwConfirm(<div className={`${commonClass} bg-red-400 `}>Fail</div>)
            }
        }
    },[userPw,userPw2])
    const onChange = useCallback((e:React.ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault();
        const t = e.target.value
        switch(e.target.id) {
            case 'userId' : setUserId(t); 
                if(t !== idChk.fixed || !!!t) {
                    setIdChk({
                        ok:false,
                        fixed:""
                    })
                }
                break;
            case 'userPw' : setUserPw(t);
                break;
            case 'userPw2' :setUserPw2(t);
                break;
            case 'userName' : setUserName(t);
                break;
            case 'userPhoneNumber' : setUserPhoneNumber(utils.phoneNumber(e));
                break;
        }
    },[])

    async function checkID(e: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        e.preventDefault();
        const uri = `/api/users/register/${userId}`
        const emailConfirm =  userId.split('@');
        if (emailConfirm.length < 2) {
            alert('이메일 형식으로 입력해주세요.');
            return;
        }
        if (emailConfirm[1]?.split('.').length < 2 ) {
            alert('옳바른 형식의 이메일을 입력해주세요');
            return;
        }
        try {
            const res = await axios.post(uri)
                .then(res=>res.data)
            if(!!!res.ok) {
                alert('중복된 아이디입니다.')
                setIdChk({
                    ok:false,
                    fixed:""
                })
            } else {
                alert('사용 가능한 ID 입니다.')
                setIdChk({
                    ok:true,
                    fixed:userId
                });
            }
        } catch(error) {
            console.error(error);
        }
    }

    async function submitHandle(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (userPw2 !== userPw) {
            return
        }
        const body:userSchema = {
            userId:userId,
            userPw:userPw,
            userName:userName,
            userPhoneNumber:userPhoneNumber,
            singUpDate: getDate(),
        }
        if(allChk && idChk.ok)
            try {
                const res = await axios.post(`/api/users/register`,body)
                    .then(res=>res.data)
                if(!!res.ok && res.type==='register') {
                    alert('회원가입을 축하드립니다.')
                    window.location.href="/login"
                } 
            } catch(error){
                console.error(error)
            }
    }

    useEffect(()=>{
        let b =!!userId 
        && !!userPw 
        && !!userPw2 
        && !!userName 
        && !!userPhoneNumber 
        && idChk.ok 
        && userPw === userPw2;
        setAllChk(b)
    },[userId,userPw,userPw2,userName,userPhoneNumber,idChk])
    const idchkBtnStyle:string = `font-medium text-white p-1 w-20 ${!idChk.ok? "bg-red-400":"bg-blue-400"}`
    return(
        <form className={`register ${mobile_box} pt-16`} onSubmit={allChk? submitHandle:(e)=>(e.preventDefault())}>
            <h2 className={title}>회원가입</h2>
            <ul className={flex_center+"flex-wrap"}>
                <Li name="userId" label="Emai (ID)" type="email" onChange={onChange}>
                    <button className={idchkBtnStyle } onClick={checkID}>
                        {!idChk.ok? "Check": "Good"}
                    </button>
                </Li>
                <Li name="userPw" label="PW" type="password" value={userPw} autoComplete="password" onChange={onChange} ></Li>
                <Li name="userPw2" label="PW confirm" type="password" autoComplete="password" onChange={onChange} >
                    { pwConfirm }
                </Li>
                <Li name="userName" label="Name" onChange={onChange}></Li>
                <Li name="userPhoneNumber" label="Phone Number" type="tel" maxLength={13} onChange={onChange}></Li>
                <li className="w-full mt-4">
                    {/* {
                        allChk ?
                       
                    } */}
                        <Btn className={allChk ? "ml-auto" :"ml-auto bg-gray-300 border border-gray-400 text-gray-600"}>
                            가입
                        </Btn> 
                </li>
            </ul>
        </form>
    )
}
export default register